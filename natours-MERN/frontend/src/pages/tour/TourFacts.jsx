import React from "react";
import styled from "styled-components";

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

const Text = styled.span`
  color: #555;
`;

const TourFacts = ({ icon, label, text, photo }) => {
  return (
    <ItemContainer>
      {icon && (
        <Icon>
          <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
        </Icon>
      )}
      {photo && <Photo src={`/img/users/${photo}`}></Photo>}
      <Label>{label}:</Label>
      <Text>{text}</Text>
    </ItemContainer>
  );
};

export default TourFacts;
