import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { processUserQuery } from '../services/api';
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
      // Format history for Gemini. The API requires history to start with a 'user' role.
      // We filter out the initial welcome message (id: 1) to satisfy this requirement.
      const history = messages
        .filter(msg => msg.id !== 1)
        .map(msg => ({
          role: msg.sender === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        }));

      const response = await processUserQuery(text, history);
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

  return (
    <div className="chat-container glass-panel animate-fade-in">
      <div className="chat-header">
        <Bot size={24} className="bot-icon" />
        <div>
          <h2>Nagorik AI Assistant</h2>
          <span className="status-text">Get Authenticated Information from Official Government Sources</span>
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
