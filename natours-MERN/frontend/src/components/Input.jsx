import styled from "styled-components";

const Input = styled.input`
  font-size: 1.5rem;
  width: 100%;
  padding: 1.5rem 2rem;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  transition: all 0.3s;

  &:focus {
    box-shadow: var(--shadow-lg);
  }
`;

export default Input;
