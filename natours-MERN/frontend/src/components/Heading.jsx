import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3.8rem;
      font-weight: 600;
      color: var(--color-green-600);
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--color-green-700);
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2.5rem;
      font-weight: 500;
      margin-bottom: 3rem;
      color: var(--color-green-500);
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2.5rem;
      font-weight: 500;
      color: var(--color-green-500);
    `}

  @media screen and (min-width: 1480px) {
    ${(props) =>
      props.as === "h1" &&
      css`
        font-size: 7rem;
      `}
  }

  @media screen and (max-width: 756px) {
    ${(props) =>
      props.as === "h1" &&
      css`
        font-size: 2.5rem;
      `}

    ${(props) =>
      props.as === "h3" &&
      css`
        /* margin-bottom: 1rem; */
      `}
  }

  transition: font-size 0.5s ease;
`;

export default Heading;
