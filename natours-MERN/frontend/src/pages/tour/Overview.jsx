import styled from "styled-components";
import TourCard from "./TourCard";
import { useTours } from "./useTours";

import Empty from "../../components/Empty";
import Spinner from "../../components/Spinner";

const Container = styled.div`
  max-width: 130rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 5rem;
  padding: 3rem;

  @media only screen and (max-width: 1180px) {
    max-width: 100rem;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  }
  @media only screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;
const CardContainer = styled.div`
  background-color: var(--color-green-0);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-0.5%);
  }
`;

function Overview() {
  const { isPending, tours } = useTours();

  if (isPending) return <Spinner />;
  if (!tours) return <Empty resourceName="Tours" />;

  return (
    <Container>
      {tours.map((tour) => (
        <CardContainer key={tour.slug}>
          <TourCard tour={tour} isPending={isPending} />
        </CardContainer>
      ))}
    </Container>
  );
}

export default Overview;
