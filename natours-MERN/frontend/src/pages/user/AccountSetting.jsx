import styled from "styled-components";
import Heading from "../../components/Heading";
import Input from "../../components/Input";
import { useState } from "react";
import { useUpdateMe } from "./useUpdateMe";

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

function AccountSetting({ curEmail, curName }) {
  const [email, setEmail] = useState(curEmail);
  const [name, setName] = useState(curName);
  const { isUpdating, updateMe } = useUpdateMe();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault(e);
    if (!email || !name) return;

    updateMe(
      { name, email },
      {
        onSettled: () => {
          setName("");
          setEmail("");
        },
      }
    );
  }

  return (
    <div>
      <Heading as="h3">Your Account Settings</Heading>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="name"
            placeholder={curName}
            required
            minLength="3"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder={curEmail}
            required
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>

        <FormGroup>
          <Button type="submit">Save Changes</Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default AccountSetting;
