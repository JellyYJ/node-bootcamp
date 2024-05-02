import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getToursData } from "../../api/api";
import TourCard from "../../components/TourCard";

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

const Overview = () => {
  const [toursData, setTourData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getToursData();
        setTourData(response?.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <CardContainer>
      <TourCard tours={toursData} />
    </CardContainer>
  );
};

export default Overview;
