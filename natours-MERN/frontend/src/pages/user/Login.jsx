// https://.../auth/login
import React, { useState } from "react";
import styled from "styled-components";
// import { login } from "../../api/api";
import { useLogin } from "./useLogin";
import Input from "../../components/Input";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const LoginForm = styled.div`
  background-color: var(--color-grey-0);
  padding: 5rem;
  border-radius: 1rem;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  width: 50rem;
`;

const HeadingSecondary = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  display: block;
`;

const Button = styled.button`
  font-size: 1.6rem;
  margin-top: 1.5rem;
  border: none;
  padding: 1.5rem 4rem;
  border-radius: 5px;
  background-color: var(--color-green-800);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-green-500);
  }
`;

function Login() {
  const { isLogging, login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault(e);
    if (!email || !password) return;
    // login({ email, password });

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Main>
      <LoginForm>
        <HeadingSecondary>Log into your account</HeadingSecondary>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
              minLength="8"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Login</Button>
          </FormGroup>
        </form>
      </LoginForm>
    </Main>
  );
}

export default Login;
