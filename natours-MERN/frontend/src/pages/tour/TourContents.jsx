import styled from "styled-components";
import TourFacts from "./TourInfo";
import Heading from "../../components/Heading";
import { convertToDateOnly } from "../../utils/dateConverter";

const ContentsContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  transition: all 0.3s ease;

  @media screen and (max-width: 1024px) {
    max-width: 100rem;
    gap: 8rem;
    flex-direction: row;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0rem;
  }
`;

const FactsContents = styled.div`
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    margin-bottom: 3rem;
    /* gap: 0.5rem; */
  }
`;

const DescriptionContainer = styled.div`
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

  @media screen and (max-width: 1024px) {
    margin-bottom: 5rem;
    margin-top: 3rem;
    max-width: 65rem;
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
  // console.log("start:", startDate);
  const startDateConverted = convertToDateOnly(startDate);

  return (
    <ContentsContainer>
      <FactsContainer>
        <FactsContents>
          <Heading as="h3">Quick Facts</Heading>
          <TourFacts
            icon="calendar"
            label="Next Date"
            text={startDateConverted}
          />
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

        <FactsContents>
          <Heading as="h3">Your Tour Guides</Heading>
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

      <DescriptionContainer>
        <Heading as="h3">About {name}</Heading>
        {paragraphs.map((text, index) => (
          <p key={index} className="description__text">
            {text}
          </p>
        ))}
      </DescriptionContainer>
    </ContentsContainer>
  );
}

export default TourContents;
