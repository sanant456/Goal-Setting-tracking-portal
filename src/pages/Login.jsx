import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const bodyData = isLogin 
        ? { email, password }
        : { name, email, password, role, department };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      if (isLogin) {
        login(data.token, data.user);
      } else {
        setSuccess('Account created successfully! Please sign in.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `/api/auth/${provider.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-card border shadow-sm glass-panel text-center overflow-hidden"
      >
        <div className="flex justify-center mb-6">
          <Target className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isLogin ? 'Log in to track your goals' : 'Join GoalSync to align and conquer'}
        </p>

        {error && <p className="text-destructive text-sm mb-4">{error}</p>}
        {success && <p className="text-primary text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="register-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-secondary border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    required={!isLogin}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-secondary border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <input 
                      type="text" 
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-secondary border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-secondary border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-secondary border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-xl transition-colors mt-6"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <span className="w-1/5 border-b border-border"></span>
          <span className="text-xs text-muted-foreground uppercase">or continue with</span>
          <span className="w-1/5 border-b border-border"></span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleOAuth('Google')}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-medium">Google</span>
          </button>
          <button 
            onClick={() => handleOAuth('GitHub')}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm font-medium">GitHub</span>
          </button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} 
            className="text-primary hover:underline font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>

      </motion.div>
    </div>
  );
};
