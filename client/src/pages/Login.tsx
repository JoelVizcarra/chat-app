import React, { FormEvent, useRef } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, user } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);

  if (user != null) return <Navigate to="/" />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login.isLoading) return;

    const username = usernameRef.current?.value;

    if (username == null || username == "") return;

    login.mutate(username);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
      >
        <label htmlFor="username">Username</label>
        <Input id="username" required ref={usernameRef} />
        <Button
          disabled={login.isLoading}
          type="submit"
          className="col-span-full"
        >
          {login.isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </>
  );
};

export default Login;
