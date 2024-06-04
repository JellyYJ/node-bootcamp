import styled from "styled-components";
import { server as hostUrl } from "../config";

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

const ProfileImg = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
`;

function Row({ user, onEdit }) {
  const imageUrl = user.photo
    ? `${hostUrl}/img/users/${user.photo}`
    : `${hostUrl}/img/users/default.jpg`;

  return (
    <tr>
      <Td>
        <ProfileImg src={imageUrl} alt={user.name} />
      </Td>
      <Td>{user.email}</Td>
      <Td>{user.name}</Td>
      <Td>{user.role}</Td>
      <Td>
        <Button onClick={() => onEdit(user)}>Edit</Button>
      </Td>
    </tr>
  );
}

export default Row;
