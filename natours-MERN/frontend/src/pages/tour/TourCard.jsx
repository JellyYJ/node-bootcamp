import React from "react";
import styled from "styled-components";
import { useTours } from "./useTours";
import Empty from "../../components/Empty";
import Spinner from "../../components/Spinner";

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

const CardHeader = styled.div`
  position: relative;
  height: 20rem;
  overflow: hidden;
`;

const CardPicture = styled.div`
  /* background-size: cover; */
  /* background-blend-mode: screen; */
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
`;

const CardPictureOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right bottom,
    var(--color-green-0),
    var(--color-green-800)
  );
  z-index: 1;
  opacity: 0.6;
`;

const CardPictureImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Heading = styled.h3`
  position: absolute;
  bottom: 3rem;
  right: 2rem;
  font-size: 2.7rem;
  font-weight: 600;
  color: var(--color-green-0);
  text-transform: uppercase;
  z-index: 2;
`;

const CardDetails = styled.div`
  padding: 3rem;
`;

const CardSubHeading = styled.h4`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const CardText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const CardData = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.svg`
  width: 2.3rem;
  height: 2.3rem;
  fill: var(--color-green-600);
  margin-right: 1.2rem;
`;

const CardFooter = styled.div`
  padding: 1.5rem;
  background-color: var(--color-green-50);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CardFooterItems = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const CardFooterItem = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 119rem) {
    margin-bottom: 1rem;
    flex-direction: column;
  }
`;

const CardFooterText = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

const CardFooterValue = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
`;

const Button = styled.a`
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.5rem 4rem;
  display: inline-block;
  border-radius: 100px;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  font-size: 1.4rem;
  color: #fff;
  background-color: var(--color-green-600);

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
`;

// const TourCard = ({ tours }) => {
function TourCard() {
  const { isPending, tours } = useTours();
  // console.log(tours);

  if (isPending) return <Spinner />;
  if (!tours) return <Empty resourceName="Tours" />;

  function handleClick(e) {
    e.prevent();
  }

  return (
    <>
      {tours.map((tour) => (
        <CardContainer key={tour.slug}>
          <CardHeader>
            <CardPicture>
              <CardPictureOverlay>&nbsp;</CardPictureOverlay>
              <CardPictureImg
                src={`img/tours/${tour.imageCover}`}
                alt={tour.name}
              />
            </CardPicture>
            <Heading>{tour.name}</Heading>
          </CardHeader>

          <CardDetails>
            <CardSubHeading>
              {`${tour.difficulty} ${tour.duration}-day tour`}
            </CardSubHeading>
            <CardText>{tour.summary}</CardText>
            <CardData>
              <CardIcon>
                <use xlinkHref="/icons.svg#icon-map-pin"></use>
              </CardIcon>
              <span>{tour.startLocation.description}</span>
            </CardData>
            <CardData>
              <CardIcon>
                <use xlinkHref="/icons.svg#icon-calendar"></use>
              </CardIcon>
              <span>
                {tour.startDates[0].toLocaleString("en-us", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </CardData>
            <CardData>
              <CardIcon>
                <use xlinkHref="/icons.svg#icon-flag"></use>
              </CardIcon>
              <span>{`${tour.locations.length} stops`}</span>
            </CardData>
            <CardData>
              <CardIcon>
                <use xlinkHref="/icons.svg#icon-user"></use>
              </CardIcon>
              <span>{`${tour.maxGroupSize} people`}</span>
            </CardData>
          </CardDetails>

          <CardFooter>
            <CardFooterItems>
              <CardFooterItem>
                <CardFooterValue>{`$${tour.price}`}</CardFooterValue>
                <CardFooterText>per person</CardFooterText>
              </CardFooterItem>

              <CardFooterItem>
                <CardFooterValue>{tour.ratingsAverage}</CardFooterValue>
                <CardFooterText>{`ratings (${tour.ratingsQuantity})`}</CardFooterText>
              </CardFooterItem>
            </CardFooterItems>
            <Button href={`/tours/${tour.id}`} onClick={handleClick}>
              Details
            </Button>
          </CardFooter>
        </CardContainer>
      ))}
    </>
  );
}

export default TourCard;
