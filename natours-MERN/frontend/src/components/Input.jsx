import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.5rem;
    width: 100%;
    padding: 1.5rem 2rem;
    border-radius: 5px;
  `,

  medium: css`
    font-size: 1.5rem;
    width: 100%;
    padding: 5rem 10rem;
    border-radius: 5px;
  `,
};

const Input = styled.input`
  ${(props) => sizes[props.size]}

  /* font-size: 1.5rem;
  width: 100%;
  padding: 1.5rem 2rem;
  border-radius: 5px; */
  border: none;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  transition: all 0.3s;

  &:focus {
    box-shadow: var(--shadow-lg);
  }
`;

Input.defaultProps = {
  size: "small",
};

export default Input;
