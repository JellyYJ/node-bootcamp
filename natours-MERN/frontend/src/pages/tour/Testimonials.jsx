import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import styled from "styled-components";

const TestimonialsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  /* clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); */
`;

const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  padding: 2rem;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 3rem;
  }

  @media screen and (max-width: 768px) {
    gap: 2rem;
  }
`;

const ExpandButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: var(--color-green-0);
  color: var(--color-green-900);
  font-size: 1.5rem;
  margin-top: 1rem;
`;
const Icon = styled.svg`
  width: 35px;
  height: 35px;
  fill: var(--color-green-500);
`;

function Testimonials({ reviews }) {
  const [expanded, setExpanded] = useState(false);
  const visibleReviews = expanded ? reviews : reviews.slice(0, 4);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <TestimonialsSection>
      <TestimonialsContainer>
        {visibleReviews.map((review, index) => (
          <TestimonialCard
            key={index}
            user={review.user}
            reviewtext={review.review}
            rating={review.rating}
          />
        ))}
      </TestimonialsContainer>

      {reviews.length > 4 && (
        <ExpandButton onClick={toggleExpand}>
          {/* {expanded ? "Collapse" : "See More Reviews"} */}
          {expanded ? (
            <Icon>
              <use xlinkHref={`/icons.svg#icon-arrow-up-circle`} />
            </Icon>
          ) : (
            <Icon>
              <use xlinkHref={`/icons.svg#icon-arrow-down-circle`} />
            </Icon>
          )}
        </ExpandButton>
      )}
    </TestimonialsSection>
  );
}

export default Testimonials;
