import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import useLocalStorage from "../hooks/useLocalStorage";

type AuthContext = {
  signup: UseMutationResult<AxiosResponse, unknown, User>;
  login: UseMutationResult<{ token: string; user: User }, unknown, string>;
  logout: UseMutationResult<AxiosResponse, unknown, void>;
  user?: User;
  streamChat?: StreamChat;
};
type User = {
  id: string;
  name: string;
  image?: string;
};

const Context = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage<User>("user");
  const [token, setToken] = useLocalStorage<string>("token");
  const [streamChat, setStreamChat] = useState<StreamChat>();

  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/signup`, { ...user });
    },
    onSuccess() {
      navigate("/login");
    },
  });

  const login = useMutation({
    mutationFn: (id: string) => {
      return axios
        .post(`${import.meta.env.VITE_API_URL}/login`, { id })
        .then((res) => res.data as { token: string; user: User });
    },
    onSuccess(data) {
      setUser(data.user);
      setToken(data.token);
    },
  });

  const logout = useMutation({
    mutationFn: () => {
      return axios.post(`${import.meta.env.VITE_API_URL}/logout`, { token });
    },
    onSuccess() {
      setUser(undefined);
      setToken(undefined);
      setStreamChat(undefined);
    },
  });

  useEffect(() => {
    if (token == null || user == null) return;
    const chat = new StreamChat(import.meta.env.VITE_STREAM_API_KEY!);

    if (chat.tokenManager.token === token && chat.userID === user.id) return;

    let isInterrupted = false;
    const connectPromise = chat.connectUser(user, token).then(() => {
      if (isInterrupted) return;
      setStreamChat(chat);
    });

    return () => {
      isInterrupted = true;
      setStreamChat(undefined);
      connectPromise.then(() => chat.disconnectUser());
    };
  }, [token, user]);

  return (
    <Context.Provider value={{ signup, login, logout, user, streamChat }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context) as AuthContext;
};

export const useLoggedInAuth = () => {
  return useContext(Context) as AuthContext &
    Required<Pick<AuthContext, "user">>;
};
