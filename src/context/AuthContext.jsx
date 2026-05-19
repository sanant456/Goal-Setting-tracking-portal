import { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider, githubProvider } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to sync Firebase user to our MongoDB backend and get roles
  const syncWithBackend = async (firebaseUser) => {
    if (!firebaseUser) return null;
    
    try {
      const idToken = await firebaseUser.getIdToken();
      setToken(idToken);
      
      const res = await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          uid: firebaseUser.uid
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        return { ...firebaseUser, ...data.user };
      }
    } catch (err) {
      console.error('Backend sync failed:', err);
    }
    return firebaseUser;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const fullUser = await syncWithBackend(firebaseUser);
        setUser(fullUser);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = async (email, password, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    
    // Send registration data to backend immediately
    await fetch('/api/auth/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        ...additionalData
      })
    });
    
    return userCredential;
  };

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const loginWithGithub = () => signInWithPopup(auth, githubProvider);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      loginWithEmail, 
      registerWithEmail, 
      loginWithGoogle, 
      loginWithGithub, 
      logout 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
