import styled from "styled-components";
import Heading from "../../components/Heading";
import { server as hostUrl } from "../../config";

const SectionHeader = styled.section`
  position: relative;
  height: 42vw;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);

  @media screen and (max-width: 768px) {
    height: 60vw;
  }
`;

const ImgContainer = styled.div`
  height: 100%;
`;

const HeaderImg = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  -o-object-position: 50% 25%;
  object-position: 50% 25%;
  z-index: 0;
`;

const ImgOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right bottom,
    var(--color-green-0),
    var(--color-green-500)
  );
  opacity: 0.8;
  z-index: 1;
`;

const HeadingBox = styled.div`
  position: absolute;
  bottom: 18vw;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: transform 0.5s ease;

  @media screen and (max-width: 768px) {
    bottom: 0vw;
    top: 50%;
  }
`;

const SubHeadingContainer = styled.div`
  color: var(--color-green-0);
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const SubHeading = styled.div`
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  transition: font-size 0.5s ease;

  @media screen and (max-width: 1480px) {
    font-size: 1.2rem;
  }
`;

const Icon = styled.svg`
  margin-right: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
  fill: currentColor;
`;

const TourHeader = ({ imageCover, name, duration, startLocation }) => {
  return (
    <SectionHeader>
      <ImgContainer>
        <ImgOverlay>&nbsp;</ImgOverlay>
        <HeaderImg src={`${hostUrl}/img/tours/${imageCover}`} alt={name} />
      </ImgContainer>

      <HeadingBox>
        <Heading as="h1">{name}</Heading>
        <SubHeadingContainer>
          <SubHeading>
            <Icon>
              <use xlinkHref="/icons.svg#icon-clock"></use>
            </Icon>
            <span>{duration} days</span>
          </SubHeading>
          <SubHeading>
            <Icon>
              <use xlinkHref="/icons.svg#icon-map-pin"></use>
            </Icon>
            <span>{startLocation?.description}</span>
          </SubHeading>
        </SubHeadingContainer>
      </HeadingBox>
    </SectionHeader>
  );
};

export default TourHeader;
