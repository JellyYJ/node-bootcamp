// https://.../auth/signup
import React, { useState } from "react";
import styled from "styled-components";
import { useSignUp } from "./useSignup";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const SignUpForm = styled.div`
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

const FormInput = styled.input`
  font-size: 1.5rem;
  width: 100%;
  padding: 1.5rem 2rem;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:focus {
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.4);
  }
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

function SignUp() {
  const { isLoading, signup } = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlepasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault(e);
    if (!email || !password) return;

    signup(
      { name, email, password, passwordConfirm },
      {
        onSettled: () => {
          setName("");
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
        },
      }
    );
  }

  return (
    <Main>
      <SignUpForm>
        <HeadingSecondary>Log into your account</HeadingSecondary>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput
              id="name"
              type="name"
              placeholder="Name"
              required
              value={name}
              onChange={handleNameChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <FormInput
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
            <FormInput
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
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormInput
              id="confirmPassword"
              type="password"
              placeholder="********"
              required
              minLength="8"
              value={passwordConfirm}
              onChange={handlepasswordConfirmChange}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Sign Up Now</Button>
          </FormGroup>
        </form>
      </SignUpForm>
    </Main>
  );
}

export default SignUp;
