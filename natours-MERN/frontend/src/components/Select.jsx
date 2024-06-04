import styled from "styled-components";

const SelectContainer = styled.select`
  padding: 0.8rem;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border-color: var(--color-green-400);
    box-shadow: 0 0 5px var(--color-green-400);
    outline: none;
  }
`;

const Select = ({ value, onChange, children }) => {
  return (
    <SelectContainer value={value} onChange={onChange}>
      {children}
    </SelectContainer>
  );
};

export default Select;
