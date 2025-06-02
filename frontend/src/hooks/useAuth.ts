import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    authUser,
    isAuthenticated,
    login,
    logout,
    signup,
    checkAuth,
    isSigninUp,
    isLoggingIn,
    isCheckingAuth,
  } = useAuthStore();

  return {
    authUser,
    isAuthenticated,
    login,
    logout,
    signup,
    checkAuth,
    isSigninUp,
    isLoggingIn,
    isCheckingAuth,
  };
};
