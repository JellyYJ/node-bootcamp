import styled from "styled-components";
import TourCard from "./TourCard";
import { useTours } from "./useTours";

import Empty from "../../components/Empty";
import Spinner from "../../components/Spinner";
import { filterTours, sortTours } from "../../utils/tourUtils";
import { useEffect, useState } from "react";
import { getToursByDistance } from "../../api/tourApi";
import TourFilters from "./TourFilters";

const Main = styled.div`
  max-width: 130rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1180px) {
    max-width: 100rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 5rem;
  padding: 3rem 0;

  @media only screen and (max-width: 1180px) {
    max-width: 100rem;
    grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
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
  const { isPending, tours = [] } = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [distanceTours, setDistanceTours] = useState([]);

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchTours(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    };

    getUserLocation();
  }, []);

  const fetchTours = async (latitude, longitude) => {
    const toursByDistance = await getToursByDistance(latitude, longitude);
    setDistanceTours(toursByDistance);
  };

  // FILTERS AND SORTING
  const filteredTours = filterTours(
    distanceTours.length ? distanceTours : tours,
    searchQuery,
    filterDifficulty
  );
  const filteredAndSortedTours = sortTours(filteredTours, sortOrder);

  if (isPending) return <Spinner />;
  if (!tours) return <Empty resourceName="Tours" />;

  return (
    <Main>
      <TourFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
      />

      <Container>
        {filteredAndSortedTours.map((tour) => (
          <CardContainer key={tour.slug}>
            <TourCard tour={tour} isPending={isPending} />
          </CardContainer>
        ))}
      </Container>
    </Main>
  );
}

export default Overview;
