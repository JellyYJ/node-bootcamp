import React from "react";
import styled from "styled-components";

const SectionPictures = styled.section`
  display: flex;
  // top-left, top-right, 85% down right side, bottom left
  clip-path: polygon(0 15%, 100% 0, 100% 85%, 0 100%);
  -webkit-clip-path: polygon(0 15%, 100% 0, 100% 85%, 0 100%);
  position: relative;
  z-index: 1000;
`;

const ImagesContainer = styled.div`
  display: block;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

export default function TourPictures({ images }) {
  return (
    <SectionPictures>
      {images.map((image, index) => (
        <ImagesContainer key={index}>
          <Image src={`/img/tours/${image}`} alt={`image-${index + 1}`} />
        </ImagesContainer>
      ))}
    </SectionPictures>
  );
}
