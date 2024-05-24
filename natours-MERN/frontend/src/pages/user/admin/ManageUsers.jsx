import { useState } from "react";
import styled from "styled-components";
import { useUsers } from "./useUsers";

import Heading from "../../../components/Heading";
import Spinner from "../../../components/Spinner";
import Empty from "../../../components/Empty";
import Table from "../../../components/Table";
import { useCreateUser } from "./useCreateUser";
import AddUserForm from "./UserForm";

const Container = styled.div`
  max-width: 130rem;
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media only screen and (max-width: 1180px) {
    max-width: 100rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.6rem;
  color: #fff;
  background-color: var(--color-green-500);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-green-600);
  }
`;

function ManageTours() {
  const { isPending, users } = useUsers();
  const { isCreating, createUser } = useCreateUser();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    setSelectedUser(null);
    setShowAddModal(true);
  };

  const handleSave = (userData) => {
    createUser(userData);
    setShowAddModal(false);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  if (isPending) return <Spinner />;
  if (!users) return <Empty resourceName="Users" />;

  return (
    <Container>
      <Header>
        <Heading as="h4">Manage Users</Heading>
        <AddButton onClick={handleAdd}>Create New User</AddButton>
      </Header>

      <Table users={users} />

      {showAddModal && (
        <AddUserForm
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={handleSave}
          isCreating={isCreating}
        />
      )}
    </Container>
  );
}

export default ManageTours;
