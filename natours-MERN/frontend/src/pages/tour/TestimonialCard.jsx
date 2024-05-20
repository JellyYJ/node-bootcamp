import styled from "styled-components";
import { server as hostUrl } from "../../config";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: row;

  background-color: var(--color-green-0);
  border-radius: 10px;
  padding: 2.5rem;
  gap: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: space-around;
  align-items: center;
  height: 20rem;
  overflow-y: auto;
`;

const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
`;

const ReviewText = styled.p`
  font-size: 1.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: ${({ active }) => (active ? "var(--color-green-500)" : "grey")};
`;

function TestimonialCard({ user, reviewtext, rating }) {
  const { photo, name } = user;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon key={i} active={i <= rating ? true : false}>
          <use xlinkHref={`/icons.svg#icon-star`} />
        </StarIcon>
      );
    }
    return stars;
  };

  return (
    <ReviewContainer>
      <UserPhoto src={`${hostUrl}/img/users/${photo}`} alt={name} />
      <ReviewContent>
        <ReviewText>{reviewtext}</ReviewText>
        <Rating>{renderStars(rating)}</Rating>
      </ReviewContent>
    </ReviewContainer>
  );
}

export default TestimonialCard;
