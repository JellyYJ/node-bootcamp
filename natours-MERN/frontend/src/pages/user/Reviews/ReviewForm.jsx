import { useState } from "react";
import axios from "axios";
import Input from "../../../components/Input";

function ReviewForm({ bookingId }) {
  console.log(bookingId);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </label>
      <label>Review:</label>
      <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;
