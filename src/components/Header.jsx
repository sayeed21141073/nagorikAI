import { useState } from 'react';
import { User, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
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
          
          {currentUser ? (
            <div className="user-profile">
              <span className="user-email">{currentUser.email}</span>
              <button onClick={handleLogout} className="icon-btn logout-btn" title="Log Out">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)} className="primary-btn">
              <User size={18} />
              <span>Login</span>
            </button>
          )}
        </div>
      </header>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
