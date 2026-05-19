import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userDataStr = params.get('user');

    if (token && userDataStr) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataStr));
        login(token, userData);
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Failed to parse OAuth user data:', err);
        navigate('/login?error=oauth_failed', { replace: true });
      }
    } else {
      navigate('/login?error=oauth_failed', { replace: true });
    }
  }, [location, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="text-muted-foreground font-medium animate-pulse">Authenticating...</p>
      </motion.div>
    </div>
  );
};
