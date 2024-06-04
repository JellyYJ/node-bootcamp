import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
  color: var(--color-grey-600);
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: var(--color-grey-400);
`;

const Message = styled.p`
  font-size: 1.6rem;
  margin: 0;
`;

const SubMessage = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0 0;
  color: var(--color-grey-400);
`;

function Empty({ resourceName }) {
  return (
    <EmptyContainer>
      <IconWrapper>
        <FaSearch />
      </IconWrapper>
      <Message>No {resourceName} could be found.</Message>
      <SubMessage>Try adjusting your search or filter criteria.</SubMessage>
    </EmptyContainer>
  );
}

export default Empty;
