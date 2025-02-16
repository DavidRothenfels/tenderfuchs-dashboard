import OpenAI from 'openai';
import { LLMConfig, LLMProvider, LLMResponse } from '../types';

const SUPPORTED_MODELS = ['mixtral-8x7b-32768', 'llama2-70b-4096'];

export class GroqProvider implements LLMProvider {
  private client: OpenAI | null = null;
  private model: string = 'mixtral-8x7b-32768';
  private temperature: number = 0.7;

  initialize(config: LLMConfig): void {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.apiUrl,
      dangerouslyAllowBrowser: true
    });

    if (config.model && this.supportsModel(config.model)) {
      this.model = config.model;
    }

    if (config.temperature !== undefined) {
      this.temperature = config.temperature;
    }
  }

  supportsModel(model: string): boolean {
    return SUPPORTED_MODELS.includes(model);
  }

  async query(prompt: string): Promise<LLMResponse> {
    if (!this.client) {
      throw new Error('Client not initialized');
    }

    try {
      const completion = await this.client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: this.model,
        temperature: this.temperature,
      });

      const response = completion.choices[0]?.message?.content || '';

      return {
        text: response,
        model: this.model,
        usage: {
          promptTokens: completion.usage?.prompt_tokens,
          completionTokens: completion.usage?.completion_tokens,
          totalTokens: completion.usage?.total_tokens,
        },
      };
    } catch (error) {
      throw new Error(`API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}