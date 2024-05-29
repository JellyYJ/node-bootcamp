import styled from "styled-components";
import { server as hostUrl } from "../../config";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Icon = styled.svg`
  width: 2.1rem;
  height: 2.1rem;
  fill: var(--color-green-500);
  margin-right: 1.2rem;
`;

const Photo = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 1.2rem;
  border-radius: 50%;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const TourFacts = ({ icon, label, text, photo }) => {
  return (
    <ItemContainer>
      {icon && (
        <Icon>
          <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
        </Icon>
      )}
      {photo && <Photo src={`${hostUrl}/img/users/${photo}`}></Photo>}
      {label && <Label>{label}:</Label>}
      <p>{text}</p>
    </ItemContainer>
  );
};

export default TourFacts;
