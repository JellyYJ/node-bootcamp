import styled from "styled-components";

const SectionHeader = styled.section`
  position: relative;
  height: 42vw;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - var(--section-rotate)),
    0 100%
  );
  -webkit-clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - var(--section-rotate)),
    0 100%
  );
`;

const Hero = styled.div`
  height: 100%;
`;

const HeroImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  -o-object-position: 50% 25%;
  object-position: 50% 25%;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right bottom,
    var(--color-green-0),
    var(--color-green-500)
  );
  opacity: 0.5;
  z-index: 1;
`;

const HeadingBox = styled.div`
  position: absolute;
  bottom: 13vw;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const HeadingBoxGroup = styled.div`
  color: var(--color-green-0);
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeadingBoxDetail = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  text-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.15);
`;

const Icon = styled.svg`
  margin-right: 0.8rem;
  height: 2rem;
  width: 2rem;
  fill: currentColor;
  filter: drop-shadow(0 0.75rem 0.5rem rgba(0, 0, 0, 0.25));
`;

const TourHeader = ({ imageCover, name, duration, startLocation }) => {
  return (
    <SectionHeader>
      <Hero>
        <HeroOverlay>&nbsp;</HeroOverlay>
        <HeroImage src={`/img/tours/${imageCover}`} alt={name} />
      </Hero>
      <HeadingBox>
        <h1>
          <span>{name}</span>
        </h1>
        <HeadingBoxGroup>
          <HeadingBoxDetail>
            <Icon>
              <use xlinkHref="/icons.svg#icon-clock"></use>
            </Icon>
            <span>{duration} days</span>
          </HeadingBoxDetail>
          <HeadingBoxDetail>
            <Icon>
              <use xlinkHref="/icons.svg#icon-map-pin"></use>
            </Icon>
            <span>{startLocation.description}</span>
          </HeadingBoxDetail>
        </HeadingBoxGroup>
      </HeadingBox>
    </SectionHeader>
  );
};

export default TourHeader;
