import styled from "styled-components";
import { useState } from "react";

import TourCard from "../tour/TourCard";
import Empty from "../../components/Empty";
import Spinner from "../../components/Spinner";
import ReviewModal from "./Reviews/ReviewModal";

import { useMyBookings } from "./useMyBookings";
import { useMyReviews } from "./useMyReviews";
import { useReviewActions } from "./Reviews/useReviewActions";

const CardContainer = styled.div`
  max-width: 130rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 5rem;
  padding: 3rem;

  @media only screen and (max-width: 1180px) {
    max-width: 100rem;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  }
  @media only screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const BookingReviewContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const BookingReviewItem = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;

function MyBookings() {
  const { isPending: isBookingsPending, tours } = useMyBookings();
  const { isPending: isReviewsPending, reviews } = useMyReviews();
  const {
    createReview,
    isCreating,
    updateReview,
    isUpdating,
    deleteReview,
    isDeleting,
  } = useReviewActions();

  const [selectedTourId, setSelectedTourId] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleViewReview = (tourId) => {
    setSelectedTourId(tourId);
    setIsShowModal(true);
  };

  const handleWriteReview = (tourId) => {
    setSelectedTourId(tourId);
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTourId(null);
    setIsShowModal(false);
  };

  const handleSaveReview = (rating, review, tourId) => {
    createReview({ rating, review, tourId });
  };

  const handleUpdateReview = (rating, review, reviewId) => {
    updateReview({ rating, review, reviewId });
  };

  const handleDeleteReview = (reviewId) => {
    deleteReview({ reviewId });
  };

  if (isBookingsPending || isReviewsPending) return <Spinner />;
  if (!tours || tours.length === 0) return <Empty resourceName={"Bookings"} />;

  return (
    <CardContainer>
      {tours.map((tour) => {
        const review = reviews.find((r) => r.tour === tour.id);

        return (
          <BookingReviewContainer key={tour.id}>
            <BookingReviewItem>
              <TourCard tour={tour} />
              {review ? (
                <button onClick={() => handleViewReview(tour.id)}>
                  {isUpdating ? "Updating..." : "View Review"}
                </button>
              ) : (
                <button onClick={() => handleWriteReview(tour.id)}>
                  {isCreating ? "Uploading..." : "Write Review"}
                </button>
              )}
            </BookingReviewItem>
          </BookingReviewContainer>
        );
      })}

      {isShowModal && (
        <ReviewModal
          tourId={selectedTourId}
          review={reviews.find((r) => r.tour === selectedTourId)}
          onClose={handleCloseModal}
          onSave={handleSaveReview}
          onUpdate={handleUpdateReview}
          onDelete={handleDeleteReview}
        />
      )}
    </CardContainer>
  );
}

export default MyBookings;
