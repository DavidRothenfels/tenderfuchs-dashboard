export interface LLMConfig {
  provider: string;
  apiKey: string;
  model?: string;
  temperature?: number;
}

export interface LLMResponse {
  text: string;
  provider: string;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface LLMProvider {
  name: string;
  initialize(config: LLMConfig): void;
  query(prompt: string): Promise<LLMResponse>;
}

export interface LLMService {
  setProvider(provider: LLMProvider, config: LLMConfig): void;
  query(prompt: string): Promise<LLMResponse>;
}