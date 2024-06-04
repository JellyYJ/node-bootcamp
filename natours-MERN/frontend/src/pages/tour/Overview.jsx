import styled from "styled-components";
import { useEffect, useState } from "react";

import { useTours } from "./useTours";
import { useTourDistances } from "./useTourDistances";
import { filterTours, sortTours } from "../../utils/tourUtils";

import TourCard from "./TourCard";
import Empty from "../../components/Empty";
import Spinner from "../../components/Spinner";
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
  const { isPending: isToursLoading, tours = [] } = useTours();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { isLoading: isDistanceToursLoading, tours: distanceTours = [] } =
    useTourDistances(latitude, longitude);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    };

    getUserLocation();
  }, []);

  // FILTERS AND SORTING
  const filteredTours = filterTours(
    distanceTours.length ? distanceTours : tours,
    searchQuery,
    filterDifficulty
  );
  const filteredAndSortedTours = sortTours(filteredTours, sortOrder) || [];

  if (isToursLoading || isDistanceToursLoading) return <Spinner />;
  if (!tours.length && !distanceTours.length)
    return <Empty resourceName="Tours" />;

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
        {filteredAndSortedTours.length ? (
          filteredAndSortedTours.map((tour) => (
            <CardContainer key={tour._id}>
              <TourCard
                tour={tour}
                isPending={isToursLoading || isDistanceToursLoading}
              />
            </CardContainer>
          ))
        ) : (
          <Empty resourceName="results" />
        )}
      </Container>
    </Main>
  );
}

export default Overview;
