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
  border: none;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  transition: all 0.3s;

  &:focus:valid {
    background: url("https://assets.digitalocean.com/labs/icons/hand-thumbs-up.svg")
      no-repeat 95% 50% var(--color-green-100);
    background-size: 25px;
  }

  &:focus:invalid {
    background: url("https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg")
      no-repeat 95% 50% var(--color-pink-100);
    background-size: 25px;
  }
`;

Input.defaultProps = {
  size: "small",
};

export default Input;
