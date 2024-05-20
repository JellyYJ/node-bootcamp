import React from "react";
import styled from "styled-components";

import { convertToMonthOnly } from "../../utils/dateConverter";
import TourFacts from "./TourFacts";
import { server as hostUrl } from "../../config";

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

function TourCard({ tour }) {
  return (
    <CardContainer key={tour.slug}>
      <CardHeader>
        <CardPicture>
          <CardPictureOverlay>&nbsp;</CardPictureOverlay>
          <CardPictureImg
            src={`${hostUrl}/img/tours/${tour.imageCover}`}
            // src={`img/tours/${tour.imageCover}`}
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

        <TourFacts icon="map-pin" text={tour.startLocation.description} />
        <TourFacts
          icon="calendar"
          text={convertToMonthOnly(tour.startDates[0])}
        />
        <TourFacts icon="flag" text={`${tour.locations.length} stops`} />
        <TourFacts icon="user" text={`${tour.maxGroupSize} people`} />
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
        <Button href={`/tours/${tour.id}`}>Details</Button>
      </CardFooter>
    </CardContainer>
  );
}

export default TourCard;
