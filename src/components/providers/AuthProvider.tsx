import supabase from '../../supabase';
import { UserLoginData, UserRegistrationData } from '../../types/types';
import { ApiError, Provider, Session, User } from '@supabase/supabase-js';
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';

interface AuthContextContent {
  register: (data: UserRegistrationData) => Promise<{
    user: User | null;
    session: Session | null;
    error: ApiError | null;
  }>;
  login: (data: UserLoginData) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider;
    url?: string | null;
    error: ApiError | null;
  }>;
  edit: (data: UserRegistrationData) => Promise<{
    data: User | null;
    user: User | null;
    error: ApiError | null;
  }>;
  logout: () => Promise<{ error: ApiError | null }>;
  user: User | null;
}

const AuthContext = createContext<AuthContextContent>({
  register: (data: UserRegistrationData) =>
    supabase.auth.signUp(data, { data: data.data }),
  login: (data: UserLoginData) => supabase.auth.signIn(data),
  edit: (data: UserRegistrationData) => supabase.auth.update(data),
  logout: () => supabase.auth.signOut(),
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({
  children,
}: {
  children: (isLoggedIn: boolean) => ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let gotSession = localStorage.getItem('authSession');
    if (gotSession) {
      const sessionObj = JSON.parse(gotSession);
      console.log('Retrieved: ', sessionObj);
      setSession(sessionObj);
      setUser(sessionObj.user);
    }
    async function getSession() {
      setLoading(false);
      const { data: subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            console.log('New session: ', session);
            setUser(session.user);
            localStorage.setItem('authSession', JSON.stringify(session));
            setSession(session);
          } else {
            localStorage.removeItem('authSession');
            setSession(null);
            setUser(null);
          }
          setLoading(false);
        }
      );
      return () => {
        subscription?.unsubscribe();
      };
    }
    getSession();
  }, []);

  const value: AuthContextContent = {
    register: (data: UserRegistrationData) => supabase.auth.signUp(data),
    login: (data: UserLoginData) => supabase.auth.signIn(data),
    edit: (data: UserRegistrationData) => supabase.auth.update(data),
    logout: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children(!!user)}
    </AuthContext.Provider>
  );
}
