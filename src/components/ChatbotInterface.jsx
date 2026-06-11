import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { processUserQuery, hasApiKey, setApiKey } from '../services/api';
import './ChatbotInterface.css';

const ChatbotInterface = ({ initialMessage }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: "As-salamu alaykum! I am Nagorik AI, your unified citizen assistant. How can I help you today?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(hasApiKey());
  const [apiKeyInput, setApiKeyInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const submitMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await processUserQuery(text);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Sorry, I am having trouble connecting to the servers right now.',
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (initialMessage) {
      const timer = setTimeout(() => {
        submitMessage(initialMessage);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [initialMessage]);

  const handleSend = async () => {
    await submitMessage(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!isApiKeySet) {
    return (
      <div className="chat-container glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', height: '100%' }}>
        <Bot size={48} className="bot-icon" style={{ marginBottom: '1rem', color: 'var(--primary)' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Welcome to Nagorik AI</h2>
        <p style={{ margin: '1rem 0', color: 'var(--text-secondary)' }}>Please enter your Google Gemini API Key to get started.</p>
        <input 
          type="password" 
          value={apiKeyInput}
          onChange={(e) => setApiKeyInput(e.target.value)}
          placeholder="AIzaSy..."
          style={{ padding: '0.75rem', width: '100%', maxWidth: '300px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', marginBottom: '1.5rem' }}
        />
        <button 
          onClick={() => {
            if (apiKeyInput.trim()) {
              setApiKey(apiKeyInput);
              setIsApiKeySet(true);
            }
          }}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Save Key & Start Chatting
        </button>
        <p style={{ fontSize: '0.8rem', marginTop: '1.5rem', opacity: 0.5 }}>Your key is only saved in your browser for this session.</p>
      </div>
    );
  }

  return (
    <div className="chat-container glass-panel animate-fade-in">
      <div className="chat-header">
        <Bot size={24} className="bot-icon" />
        <div>
          <h2>Nagorik AI Assistant</h2>
          <span className="status-text">Official Government Source</span>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className={`message-avatar ${msg.sender}`}>
              {msg.sender === 'bot' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={`message-bubble ${msg.sender}`}>
              <ReactMarkdown 
                components={{
                  a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="markdown-link" />
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper bot">
            <div className="message-avatar bot"><Bot size={18} /></div>
            <div className="message-bubble bot typing">
              <Loader2 className="spinner" size={18} />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question (e.g. How do I renew my passport?)"
          className="chat-input"
          disabled={isTyping}
        />
        <button 
          onClick={handleSend} 
          disabled={!inputValue.trim() || isTyping}
          className="send-btn"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotInterface;
