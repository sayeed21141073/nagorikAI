import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { signup, login, loginWithGoogle, isFirebaseConfigured } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onClose();
    } catch (err) {
      if (err?.code === 'auth/configuration-not-found') {
        setError('Firebase Authentication is not enabled for this project yet. Please enable Email/Password in the Firebase Console.');
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      onClose();
    } catch (err) {
      if (err?.code === 'auth/configuration-not-found') {
        setError('Google sign-in is not enabled in Firebase Authentication for this project. In Firebase Console, enable Google and add your GitHub Pages domain to Authorized domains.');
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-fade-in">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        <h2 className="modal-title">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button disabled={loading || !isFirebaseConfigured} type="submit" className="primary-btn w-full justify-center">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="divider"><span>OR</span></div>
        
        <button disabled={loading || !isFirebaseConfigured} onClick={handleGoogle} className="google-btn w-full justify-center">
          Continue with Google
        </button>
        
        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => !loading && setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
        {!isFirebaseConfigured && (
          <p className="auth-toggle" style={{ marginTop: '0.75rem' }}>
            Firebase Auth is not configured in this build yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
