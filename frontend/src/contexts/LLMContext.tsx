import React, { createContext, useContext, useEffect, useState } from 'react';
import { LLMResponse, getProviderFromUrl } from '../services/llm/types';
import { llmService } from '../services/llm/LLMService';
import { OpenAIProvider } from '../services/llm/providers/openai';
import { GroqProvider } from '../services/llm/providers/groq';

interface LLMContextType {
  isConfigured: boolean;
  query: (prompt: string) => Promise<LLMResponse>;
  error: string | null;
  providerName: string;
  model: string;
}

const LLMContext = createContext<LLMContextType | undefined>(undefined);

const getProvider = (apiUrl: string) => {
  if (apiUrl.includes('api.groq.com')) {
    return new GroqProvider();
  }
  return new OpenAIProvider();
};

export const LLMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providerName, setProviderName] = useState('');
  const [model, setModel] = useState('');

  useEffect(() => {
    const setupLLM = () => {
      try {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        const apiUrl = process.env.REACT_APP_LLM_API_URL || 'https://api.openai.com/v1';
        
        if (!apiKey) {
          throw new Error('API key not found in environment variables');
        }

        const provider = getProvider(apiUrl);
        const selectedModel = process.env.REACT_APP_LLM_MODEL ||
                            (apiUrl.includes('api.groq.com') ? 'mixtral-8x7b-32768' : 'gpt-3.5-turbo');

        if (!provider.supportsModel(selectedModel)) {
          throw new Error(`Model ${selectedModel} not supported by this provider`);
        }

        llmService.setProvider(provider, {
          apiKey,
          model: selectedModel,
          apiUrl,
        });

        setProviderName(getProviderFromUrl(apiUrl));
        setModel(selectedModel);
        setIsConfigured(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize LLM service');
        setIsConfigured(false);
      }
    };

    setupLLM();
  }, []);

  const queryLLM = async (prompt: string): Promise<LLMResponse> => {
    if (!isConfigured) {
      throw new Error('LLM service not configured');
    }
    return llmService.query(prompt);
  };

  return (
    <LLMContext.Provider
      value={{
        isConfigured,
        query: queryLLM,
        error,
        providerName,
        model,
      }}
    >
      {children}
    </LLMContext.Provider>
  );
};

export const useLLM = () => {
  const context = useContext(LLMContext);
  if (context === undefined) {
    throw new Error('useLLM must be used within a LLMProvider');
  }
  return context;
};