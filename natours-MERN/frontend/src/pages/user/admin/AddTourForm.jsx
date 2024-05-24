import styled from "styled-components";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import Heading from "../../../components/Heading";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
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

function AddTourForm({ tour, onSave, onClose, isCreating }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [maxGroupSize, setMaxGroupSize] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [price, setPrice] = useState(0);
  const [summary, setSummary] = useState("");
  // const [imageCover, setImageCover] = useState("");

  useEffect(() => {
    if (tour) {
      setName(tour.name);
      setDuration(tour.duration);
      setMaxGroupSize(tour.maxGroupSize);
      setDifficulty(tour.difficulty);
      setPrice(tour.price);
      setSummary(tour.summary);
      // setImageCover(tour.imageCover);
    }
  }, [tour]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tourData = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      // imageCover,
    };

    onSave(tourData);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <Heading as="h4">Create New Tour</Heading>
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

          <SubmitButton disabled={isCreating} type="submit">
            {isCreating ? "Creating..." : "Save"}
          </SubmitButton>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default AddTourForm;
