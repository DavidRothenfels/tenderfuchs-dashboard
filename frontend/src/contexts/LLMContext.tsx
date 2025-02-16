import React, { createContext, useContext, useEffect, useState } from 'react';
import { LLMResponse } from '../services/llm/types';
import { llmService } from '../services/llm/LLMService';
import { OpenAIProvider } from '../services/llm/providers/openai';

interface LLMContextType {
  isConfigured: boolean;
  query: (prompt: string) => Promise<LLMResponse>;
  error: string | null;
}

const LLMContext = createContext<LLMContextType | undefined>(undefined);

export const LLMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setupLLM = () => {
      try {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        if (!apiKey) {
          throw new Error('OpenAI API key not found in environment variables');
        }

        const provider = new OpenAIProvider();
        llmService.setProvider(provider, {
          provider: 'openai',
          apiKey,
        });

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