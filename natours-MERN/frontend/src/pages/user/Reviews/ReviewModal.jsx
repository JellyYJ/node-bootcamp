import { useState, useEffect } from "react";
import styled from "styled-components";
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
  max-width: 50rem;
  width: 100%;
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

const DeleteButton = styled.button`
  padding: 1rem 2rem;
  background: var(--color-red-700);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background: var(--color-red-800);
  }
  &:disabled {
    background: #ccc;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Star = styled.span`
  font-size: 2.5rem;
  cursor: pointer;
  color: ${(props) => (props.active ? "var(--color-green-400)" : "#ccc")};
`;

function ReviewModal({ tourId, review, onClose, onSave, onUpdate, onDelete }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (review) {
      setContent(review.review);
      setRating(review.rating);
    }
  }, [review]);

  const handleSubmit = () => {
    if (review) {
      if (!content || !rating) return;
      onUpdate(rating, content, review.id);
    } else {
      if (!content || !rating) return;
      onSave(rating, content, tourId);
    }
  };

  const clearModal = () => {
    setContent("");
    setRating(0);
  };

  const handleDelete = () => {
    if (review) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review?"
      );
      if (confirmed) {
        onDelete(review.id);
        clearModal();
      }
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <Heading as="h4">
            {review ? "Update Review" : "Write a Review"}
          </Heading>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <label>
          Rating:
          <StarsContainer>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                active={index < rating}
                onClick={() => handleStarClick(index)}
              >
                ★
              </Star>
            ))}
          </StarsContainer>
        </label>

        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SubmitButton onClick={handleSubmit} disabled={!content || rating}>
            {review ? "Update" : "Submit"}
          </SubmitButton>
          {review && <DeleteButton onClick={handleDelete}>Delete</DeleteButton>}
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ReviewModal;
