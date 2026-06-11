import { Globe } from 'lucide-react';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [lang, setLang] = useState('EN');

  const toggleLanguage = () => {
    const newLang = lang === 'EN' ? 'BN' : 'EN';
    setLang(newLang);
    alert(`Language switched to ${newLang === 'EN' ? 'English' : 'Bengali'}`);
  };
  return (
    <header className="header glass-panel animate-fade-in">
      <div className="logo-container">
        <h1 className="logo-text">Nagorik <span className="highlight">AI</span></h1>
      </div>
      <div className="header-actions">
        <button className="icon-btn" title="Toggle Language" onClick={toggleLanguage}>
          <Globe size={20} />
          <span>{lang} / {lang === 'EN' ? 'BN' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
