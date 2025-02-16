import React, { useState } from 'react';
import { useLLM } from '../contexts/LLMContext';

const Chat: React.FC = () => {
  const { isConfigured, query, error, providerName, model } = useLLM();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !isConfigured) return;

    setIsLoading(true);
    try {
      const result = await query(prompt);
      setResponse(result.text);
    } catch (err) {
      setResponse(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="chat-error">LLM Service Error: {error}</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-info">
        <span>Provider: {providerName}</span>
        <span>Model: {model}</span>
      </div>
      <div className="chat-response">
        {response || 'Fragen Sie das Sprachmodell etwas...'}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ihre Frage..."
          disabled={!isConfigured || isLoading}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={!isConfigured || isLoading || !prompt.trim()}
          className="chat-button"
        >
          {isLoading ? 'Lädt...' : 'Senden'}
        </button>
      </form>
    </div>
  );
};

export default Chat;