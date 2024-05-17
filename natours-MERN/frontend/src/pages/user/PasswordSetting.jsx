import styled from "styled-components";
import Heading from "../../components/Heading";
import Input from "../../components/Input";
import { useState } from "react";
import { useUpdatePassword } from "./useUpdatePassword";

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  display: block;
`;

const Button = styled.button`
  font-size: 1.5rem;
  margin-top: 1rem;
  border: none;
  padding: 1.2rem 2.4rem;
  border-radius: 5px;
  background-color: var(--color-green-800);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-green-500);
  }
`;

function PasswordSetting() {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfrim] = useState("");
  const { isUpdating, updatePassword } = useUpdatePassword();

  const handlePasswordCurrentChange = (e) => {
    setPasswordCurrent(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfrim(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault(e);
    if (!passwordCurrent || !password || !passwordConfirm) return;

    updatePassword(
      { passwordCurrent, password, passwordConfirm },
      {
        onSettled: () => {
          setPasswordCurrent("");
          setPassword("");
          setPasswordConfrim("");
        },
      }
    );
  }

  // passwordCurrent, password, passwordConfirm
  return (
    <div>
      <Heading as="h3">Your Account Settings</Heading>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="passwordCurrent">Current Password</FormLabel>
          <Input
            id="passwordCurrent"
            type="password"
            placeholder="********"
            required
            minLength="8"
            value={passwordCurrent}
            onChange={handlePasswordCurrentChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password">New Password</FormLabel>
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
          <FormLabel htmlFor="passwordConfirm">Password Confirm</FormLabel>
          <Input
            id="passwordConfirm"
            type="password"
            placeholder="********"
            required
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
        </FormGroup>

        <FormGroup>
          <Button disabled={isUpdating} type="submit" onClick={handleSubmit}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default PasswordSetting;
