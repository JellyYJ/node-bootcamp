import { useMyReviews } from "./useMyReviews";
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

function MyReviews() {
  const { isPneding, reviews } = useMyReviews();

  if (isPneding) return <Spinner />;
  if (!reviews || reviews.length === 0)
    return <Empty resourceName={"Reviews"} />;

  return <CardContainer>{/* <TourCard tours={tours} /> */}</CardContainer>;
}

export default MyReviews;
