import { Globe } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-panel animate-fade-in">
      <div className="logo-container">
        <div className="logo-icon">🇧🇩</div>
        <h1 className="logo-text">Nagorik <span className="highlight">AI</span></h1>
      </div>
      <div className="header-actions">
        <button className="icon-btn" title="Toggle Language">
          <Globe size={20} />
          <span>EN / BN</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
