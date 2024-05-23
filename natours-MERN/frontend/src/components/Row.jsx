import React from "react";
import styled from "styled-components";

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const Button = styled.button`
  font-size: 1.5rem;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--color-green-500);
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-green-600);
  }
`;

function Row({ user, onEdit, onDelete }) {
  return (
    <tr>
      <Td>{user.email}</Td>
      <Td>{user.name}</Td>
      <Td>
        <img src={user.photo} alt={user.name} width="50" />
      </Td>
      <Td>{user.role}</Td>
      <Td>
        <Button onClick={() => onEdit(user)}>Edit</Button>
        {/* <Button onClick={() => onDelete(user._id)}>Delete</Button> */}
      </Td>
    </tr>
  );
}

export default Row;
