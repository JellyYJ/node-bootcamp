import styled from "styled-components";
import { useState } from "react";

import Input from "../../../components/Input";
import Heading from "../../../components/Heading";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 60rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    max-width: 45rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  display: block;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: var(--color-green-500);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: var(--color-green-600);
  }
  &:disabled {
    background: #ccc;
  }
`;

const ButtonGroup = styled.div`
  display: "flex";
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  padding: 1rem 2rem;
  background: var(--color-red-700);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background: var(--color-red-800);
  }
  &:disabled {
    background: #ccc;
  }
`;

function UserForm({
  user,
  onUpdate,
  onClose,
  isUpdating,
  onDelete,
  isDeleting,
}) {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [role, setRole] = useState(user?.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onUpdate(name, email, role, user._id);
    } else {
      // onSave(rating, content, tourId);
    }
  };

  const handleDelete = () => {
    if (user) {
      const confirmed = window.confirm(
        "Are you sure you want to deactivate this user?"
      );
      if (confirmed) {
        onDelete(user._id);
      } else {
        onClose();
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <Heading as="h4">{user ? "Edit User" : "Create New User"}</Heading>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <form>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Role</FormLabel>
            <Input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </FormGroup>

          {user ? (
            <ButtonGroup>
              <SubmitButton
                disabled={isUpdating}
                type="submit"
                onClick={handleSubmit}
              >
                {isUpdating ? "Updating..." : "Update"}
              </SubmitButton>
              <DeleteButton disabled={isDeleting} onClick={handleDelete}>
                Delete
              </DeleteButton>
            </ButtonGroup>
          ) : (
            <SubmitButton disabled={isUpdating} type="submit">
              {isUpdating ? "Saving..." : "Save"}
            </SubmitButton>
          )}
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default UserForm;
