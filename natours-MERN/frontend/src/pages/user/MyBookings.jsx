import { useMyBookings } from "./useMyBookings";
import TourCard from "../tour/TourCard";
import Empty from "../../components/Empty";
import Spinner from "../../components/Spinner";
import styled from "styled-components";

const CardContainer = styled.div`
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

function MyBookings() {
  const { isPneding, tours } = useMyBookings();

  if (isPneding) return <Spinner />;
  if (!tours) return <Empty resourceName={"Bookings"} />;

  return (
    <CardContainer>
      <TourCard tours={tours} />
    </CardContainer>
  );
}

export default MyBookings;
