import styled from "styled-components";
import TourFacts from "./TourFacts";
import Heading from "../../components/Heading";

const ContentsContainer = styled.div`
  background-color: var(--color-green-50);
  margin-top: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /* gap: 10rem; */
  /* margin: 20rem; */
`;

const FactsContainer = styled.div`
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
`;

const FactsContents = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const DescriptionBox = styled.div`
  max-width: 50rem;

  .description {
    /* margin-right: 5rem; */
  }

  .description__text {
    font-size: 1.7rem;
    margin-top: 3rem;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`;

function TourContents({
  startDate,
  difficulty,
  maxGroupSize,
  ratingsAverage,
  guides,
  name,
  description,
}) {
  const paragraphs = description.split("\n");
  console.log(guides);
  return (
    <ContentsContainer>
      <FactsContainer>
        <Heading as="h3">QUICK FACTS</Heading>
        <FactsContents>
          <TourFacts icon="calendar" label="Next Date" text={startDate} />
          <TourFacts icon="trending-up" label="Difficulty" text={difficulty} />
          <TourFacts
            icon="user"
            label="Participants"
            text={`${maxGroupSize} people`}
          />
          <TourFacts
            icon="star"
            label="Rating"
            text={`${ratingsAverage} / 5`}
          />
        </FactsContents>

        <Heading as="h3">Your Tour Guides</Heading>
        <FactsContents>
          {guides.map((guide) => (
            <TourFacts
              key={guide._id}
              photo={guide.photo}
              label={guide.role === "guide" ? "Tour-Guide" : guide.role}
              text={guide.name}
            />
          ))}
        </FactsContents>
      </FactsContainer>

      <DescriptionBox>
        <Heading as="h3">About {name}</Heading>
        {paragraphs.map((text, index) => (
          <p key={index} className="description__text">
            {text}
          </p>
        ))}
      </DescriptionBox>
    </ContentsContainer>
  );
}

export default TourContents;
