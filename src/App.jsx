import { useState } from 'react';
import Header from './components/Header';
import ServiceQuickLinks from './components/ServiceQuickLinks';
import ChatbotInterface from './components/ChatbotInterface';
import './App.css';

function App() {
  const [initialQuery, setInitialQuery] = useState('');
  const [showConsent, setShowConsent] = useState(true);

  const handleServiceClick = (serviceTitle) => {
    setInitialQuery(`I need help with my ${serviceTitle}.`);
  };

  return (
    <div className="app-layout">
      {showConsent && (
        <div className="consent-banner">
          <p>We collect no cookies. Your privacy is respected.</p>
          <button className="consent-btn" onClick={() => setShowConsent(false)}>Accept</button>
        </div>
      )}
      
      <div className="regional-banner">
        This platform is exclusively dedicated to serving the citizens and residents of Bangladesh.
      </div>

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
      <footer className="app-footer">
        <p>2026 Copyright © MD. SAYEED IBNE ZAMAN</p>
        <p>Email: <a href="mailto:sayeedibne.devops@gmail.com">sayeedibne.devops@gmail.com</a></p>
      </footer>
    </div>
  );
}

export default App;
