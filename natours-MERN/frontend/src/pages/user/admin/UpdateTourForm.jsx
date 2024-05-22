import styled from "styled-components";
import Input from "../../../components/Input";
import { useState } from "react";
import { server as hostUrl } from "../../../config";
import Heading from "../../../components/Heading";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 5rem;
  /* align-items: center; */
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 100rem;
  width: 100%;
  @media only screen and (max-width: 1024px) {
    max-width: 80rem;
  }

  @media only screen and (max-width: 768px) {
    max-width: 45rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 2rem;
  resize: vertical;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: var(--color-green-500);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: var(--color-green-600);
  }
  &:disabled {
    background: #ccc;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImg = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  font-size: 1.5rem;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  color: var(--color-green-400);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-green-400);
    color: #fff;
    transform: translateY(-0.3rem);
  }
`;

function UpdateTourForm({ tour, onUpdate, onClose, isUpdating }) {
  const [name, setName] = useState(tour.name);
  const [duration, setDuration] = useState(tour.duration);
  const [maxGroupSize, setMaxGroupSize] = useState(tour.maxGroupSize);
  const [difficulty, setDifficulty] = useState(tour.difficulty);
  const [price, setPrice] = useState(tour.price);
  const [summary, setSummary] = useState(tour.summary);
  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !duration || !maxGroupSize || !difficulty || !price) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("maxGroupSize", maxGroupSize);
    formData.append("difficulty", difficulty);
    formData.append("price", price);
    if (imageCover) {
      formData.append("imageCover", imageCover);
    }
    if (images.length > 0) {
      images.forEach((image) => formData.append("images", image));
    }
    onUpdate(formData, tour.id);
  };

  const handlePhotoChange = (e) => {
    setImageCover(e.target.files[0]);
  };

  const handleMultiplePhotosChange = (e) => {
    let arrayOfImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      arrayOfImages.push(e.target.files[i]);
    }
    setImages(arrayOfImages);
  };

  const imageUrl = imageCover
    ? URL.createObjectURL(imageCover)
    : `${hostUrl}/img/tours/default-cover.png`;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <Heading as="h4">Edit Tour</Heading>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Tour Name</FormLabel>
            <Input
              type="text"
              placeholder="Tour Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <FormSection>
            <FormGroup>
              <FormLabel>Duration</FormLabel>
              <Input
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Max Group Size</FormLabel>
              <Input
                type="number"
                placeholder="Max Group Size"
                value={maxGroupSize}
                onChange={(e) => setMaxGroupSize(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Difficulty</FormLabel>
              <Input
                type="text"
                placeholder="Difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
          </FormSection>

          <FormGroup>
            <FormLabel>Summary</FormLabel>
            <TextArea
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <ProfileContainer>
              <ProfileImg src={imageUrl} alt="Tour Image Cover" />
              <UploadButton htmlFor="imageCover">
                Upload Tour Cover Image
              </UploadButton>
              <FileInput
                id="imageCover"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </ProfileContainer>
          </FormGroup>

          <FormGroup>
            <ProfileContainer>
              {images.map((image, index) => (
                <ProfileImg
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Tour Image ${index + 1}`}
                />
              ))}
              <UploadButton htmlFor="images">Upload Tour Images</UploadButton>
              <FileInput
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultiplePhotosChange}
              />
            </ProfileContainer>
          </FormGroup>

          <SubmitButton type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </SubmitButton>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default UpdateTourForm;
