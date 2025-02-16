import { LLMConfig, LLMProvider, LLMResponse, LLMService } from './types';

class LLMServiceImpl implements LLMService {
  private currentProvider: LLMProvider | null = null;

  setProvider(provider: LLMProvider, config: LLMConfig): void {
    provider.initialize(config);
    this.currentProvider = provider;
  }

  async query(prompt: string): Promise<LLMResponse> {
    if (!this.currentProvider) {
      throw new Error('No LLM provider configured');
    }

    return this.currentProvider.query(prompt);
  }
}

// Singleton-Instanz
export const llmService = new LLMServiceImpl();