import { useState } from "react";
import styled from "styled-components";
import Heading from "../../../components/Heading";
import Input from "../../../components/Input";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const format = "MM/DD/YYYY";

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

const Select = styled.select`
  width: 100%;
  padding: 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  transition: all 0.3s;

  &:focus {
    box-shadow: var(--shadow-lg);
    outline: none;
  }
`;

function AddTourForm({ onSave, onClose, isCreating }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [price, setPrice] = useState("");
  const [startDates, setStartDates] = useState([]);
  const [summary, setSummary] = useState("");

  const isNameValid = name.length >= 10;
  const isDurationValid = /^\d+$/.test(duration) && parseInt(duration) >= 0;
  const isMaxGroupSizeValid =
    /^\d+$/.test(maxGroupSize) && parseInt(maxGroupSize) >= 0;
  const isPriceValid = /^\d+$/.test(price) && parseInt(price) >= 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNameValid && isDurationValid && isMaxGroupSizeValid && isPriceValid) {
      const tourData = {
        name,
        duration: parseInt(duration),
        maxGroupSize: parseInt(maxGroupSize),
        difficulty,
        price: parseInt(price),
        summary,
        startDates: startDates.map((date) => date.format(format)), // Format the dates
      };
      onSave(tourData);
    } else {
      return;
    }
  };

  // Limit dates selection
  const handleDateChange = (dates) => {
    if (dates.length <= 5) {
      setStartDates(dates);
    } else {
      alert("You can select up to 5 dates only.");
    }
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
              minLength={10}
              required
            />
          </FormGroup>

          <FormSection>
            <FormGroup>
              <FormLabel>Duration</FormLabel>
              <Input
                type="number"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min={1}
                step={1}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Start Dates</FormLabel>
              <DatePicker
                value={startDates}
                onChange={handleDateChange}
                multiple
                sort
                format={format}
                minDate={new DateObject().set({
                  day: new Date().getDate(),
                  format,
                })}
                calendarPosition="bottom-center"
                plugins={[<DatePanel />]}
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <FormGroup>
              <FormLabel>Max Group Size</FormLabel>
              <Input
                type="number"
                placeholder="Max Group Size"
                value={maxGroupSize}
                onChange={(e) => setMaxGroupSize(e.target.value)}
                min={1}
                step={1}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Difficulty</FormLabel>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="difficult">Difficult</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={1}
                step={1}
                required
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
