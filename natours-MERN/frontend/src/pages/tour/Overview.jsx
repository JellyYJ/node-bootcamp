import React from "react";
import styled from "styled-components";
import TourCard from "./TourCard";
import { useTours } from "./useTours";

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

function Overview() {
  const { isPending, tours } = useTours();

  return (
    <CardContainer>
      <TourCard tours={tours} isPending={isPending} />
    </CardContainer>
  );
}

export default Overview;
