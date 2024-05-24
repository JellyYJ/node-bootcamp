import { useState } from "react";
import styled from "styled-components";
import Row from "./Row";
import { useUserActions } from "../pages/user/admin/useUserActions";
import UserForm from "../pages/user/admin/UserForm";

const TableComponent = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;

function Table({ users }) {
  const { isUpdating, updateUser, isDeleting, deleteUser } = useUserActions();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const onEdit = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleUpdate = (name, email, role, userId) => {
    updateUser({ name, email, role, userId });
    setShowUpdateModal(false);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <div>
      <TableComponent>
        <thead>
          <tr>
            <Th>Email</Th>
            <Th>Name</Th>
            <Th>Photo</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <Row key={user._id} user={user} onEdit={onEdit} />
          ))}
        </tbody>
      </TableComponent>

      {showUpdateModal && (
        <UserForm
          user={selectedUser}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
}

export default Table;
