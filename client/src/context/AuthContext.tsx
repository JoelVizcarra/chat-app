import { createContext, ReactNode, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type AuthContext = {};
type User = {
  id: string;
  name: string;
  image?: string;
};

const Context = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const singup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/singup`, { ...user });
    },
  });
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const useAuth = () => {
  return useContext(Context);
};
