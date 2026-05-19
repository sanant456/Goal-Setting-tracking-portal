import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Target, Bell, Search, LogOut, ChevronDown } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ManagerView } from './pages/ManagerView';
import { AdminView } from './pages/AdminView';
import { CreateGoal } from './pages/CreateGoal';
import { SharedGoals } from './pages/SharedGoals';
import { CheckIn } from './pages/CheckIn';
import { Analytics } from './pages/Analytics';

const TopHeader = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 z-40 sticky top-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-display font-bold text-white tracking-tight">PerformIQ</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search goals, peers..." 
            className="pl-10 pr-4 py-1.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-all w-64 text-foreground"
          />
        </div>
        
        <button className="relative text-muted-foreground hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-card"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-border cursor-pointer group" onClick={logout}>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role || 'Employee'}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm uppercase">
            {user?.name?.substring(0, 2) || 'U'}
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
};

const HorizontalNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'My Dashboard' },
    { path: '/manager', label: 'Manager View' },
    { path: '/admin', label: 'Admin View' },
    { path: '/create', label: 'Create Goal' },
    { path: '/shared', label: 'Shared Goals' },
    { path: '/check-in', label: 'Quarterly Check-In' },
    { path: '/analytics', label: 'Analytics' }
  ];

  return (
    <nav className="bg-card border-b border-border px-6 overflow-x-auto whitespace-nowrap hide-scrollbar">
      <div className="flex space-x-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                isActive 
                  ? 'text-primary border-primary bg-primary/5' 
                  : 'text-muted-foreground border-transparent hover:text-white hover:bg-secondary/50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const MainApp = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <TopHeader />
      <HorizontalNav />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manager" element={<ManagerView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/create" element={<CreateGoal />} />
          <Route path="/shared" element={<SharedGoals />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
