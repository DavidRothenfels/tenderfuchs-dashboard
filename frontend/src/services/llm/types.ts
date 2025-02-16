export interface LLMConfig {
  apiKey: string;
  model: string;
  apiUrl: string;
  temperature?: number;
}

export interface LLMResponse {
  text: string;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface LLMProvider {
  initialize(config: LLMConfig): void;
  query(prompt: string): Promise<LLMResponse>;
  supportsModel(model: string): boolean;
}

export interface LLMService {
  setProvider(provider: LLMProvider, config: LLMConfig): void;
  query(prompt: string): Promise<LLMResponse>;
}

export const getProviderFromUrl = (url: string): string => {
  if (url.includes('api.openai.com')) return 'OpenAI';
  if (url.includes('api.groq.com')) return 'Groq';
  return 'Custom';
};