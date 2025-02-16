import OpenAI from 'openai';
import { LLMConfig, LLMProvider, LLMResponse } from '../types';

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI | null = null;
  private model: string = 'gpt-3.5-turbo';
  private temperature: number = 0.7;

  public readonly name = 'openai';

  initialize(config: LLMConfig): void {
    if (!config.apiKey) {
      throw new Error('OpenAI API key is required');
    }

    this.client = new OpenAI({
      apiKey: config.apiKey,
      dangerouslyAllowBrowser: true
    });

    if (config.model) {
      this.model = config.model;
    }

    if (config.temperature !== undefined) {
      this.temperature = config.temperature;
    }
  }

  async query(prompt: string): Promise<LLMResponse> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
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
        provider: this.name,
        model: this.model,
        usage: {
          promptTokens: completion.usage?.prompt_tokens,
          completionTokens: completion.usage?.completion_tokens,
          totalTokens: completion.usage?.total_tokens,
        },
      };
    } catch (error) {
      throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}