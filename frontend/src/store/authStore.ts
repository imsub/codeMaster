import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axiosInstance';
import type { AuthUser, SignupPayload , LoginPayload } from '../types/auth';
import { safe } from '../lib/safe';
import { AxiosError } from 'axios';

interface AuthState {
  authUser: AuthUser | null;
  isAuthenticated: boolean;
  isSigninUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (user: SignupPayload) => Promise<void>;
  login: (user: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}
export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isAuthenticated: false,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    const [res , err] = await safe(axiosInstance.get('/auth/check'));
    if (res) {
      set({ authUser: res.data, isAuthenticated: true });
    } else {
      console.error('❌ Auth check failed:', err);
      set({ authUser: null, isAuthenticated: false  });
    }
    set({ isCheckingAuth: false });
  },

  signup: async (user: SignupPayload) => {
     set({ isSigninUp: true });
    const [res, err] = await safe(axiosInstance.post('/auth/register', user));

    if (res) {
      set({ authUser: res.data.user, isAuthenticated: true });
      toast.success(res.data.message || 'Signup successful');
    } else {
      const message = (err as AxiosError<{ message?: string }>)?.response?.data?.message || 'Signup failed';
      console.error('❌ Signup failed:', err);
      toast.error(message);
    }

    set({ isSigninUp: false });
  },

  login: async (user: LoginPayload) => {
    const [res, err] = await safe(axiosInstance.post('/auth/login', user));

    if (res) {
      set({ authUser: res.data, isAuthenticated: true , isLoggingIn: true });
      toast.success(res.data.message || 'Login successful');
      
    } else {
      const message = (err as AxiosError<{ message?: string }>)?.response?.data?.message || 'Login failed';
      console.error('❌ Login failed:', err);
      set({ isLoggingIn: false , authUser: null, isAuthenticated: false});
      toast.error(message);
    }
  },

  logout: async () => {
   const [ err] = await safe(axiosInstance.post('/auth/logout'));
    if (!err) {
      set({ authUser: null, isAuthenticated: false , isLoggingIn: false });
      toast.success('Logged out successfully');
    } else {
      const axiosError = err as unknown as AxiosError<{ message?: string }>;
      const message = axiosError?.response?.data?.message || 'Logout failed';
      console.error('❌ Logout failed:', err);
      toast.error(message);
    }
  },
}));
