import { useState } from 'react';
import Header from './components/Header';
import ServiceQuickLinks from './components/ServiceQuickLinks';
import ChatbotInterface from './components/ChatbotInterface';
import './App.css';

function App() {
  const [initialQuery, setInitialQuery] = useState('');

  const handleServiceClick = (serviceTitle) => {
    setInitialQuery(`I need help with my ${serviceTitle}.`);
  };

  return (
    <div className="app-layout">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      
      <Header />
      
      <main className="main-content">
        <aside className="sidebar">
          <ServiceQuickLinks onServiceClick={handleServiceClick} />
        </aside>
        <section className="chat-section">
          <ChatbotInterface initialMessage={initialQuery} />
        </section>
      </main>
    </div>
  );
}

export default App;
