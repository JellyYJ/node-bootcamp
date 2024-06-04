import styled from "styled-components";
import { useMoveBack } from "../utils/useMoveBack";
import Heading from "./Heading";

const StyledPageNotFound = styled.main`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-green-50);
  border-radius: var(--border-radius-lg);
  padding: 5rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 5rem;
  }
`;

const Button = styled.button`
  font-size: 1.8rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  background-color: var(--color-green-400);
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-green-500);
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={moveBack}>&larr; Go back</Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
