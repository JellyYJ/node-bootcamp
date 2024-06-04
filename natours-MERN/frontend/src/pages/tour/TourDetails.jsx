import Spinner from "../../components/Spinner";
import { useTour } from "./useTour";
import TourHeader from "./TourHeader";
import TourContents from "./TourContents";
import TourPictures from "./TourPictures";
import MapBox from "./Mapbox";
import Testimonials from "./Testimonials";
import Empty from "../../components/Empty";
import BookTour from "./BookTour";

function TourDetails() {
  const { tour = {}, isPending } = useTour();
  console.log(tour);
  if (isPending) return <Spinner />;
  if (!tour || Object.keys(tour).length === 0)
    return <Empty resourceName="tour" />;

  return (
    <>
      <TourHeader
        tour={tour}
        imageCover={tour.imageCover}
        name={tour.name}
        duration={tour.duration}
        startLocation={tour.startLocation ? tour.startLocation : null}
      />

      <TourContents
        startDate={tour.startDates[0]}
        difficulty={tour.difficulty}
        maxGroupSize={tour.maxGroupSize}
        startLocation={tour.startLocation ? tour.startLocation : null}
        ratingsAverage={tour.ratingsAverage}
        name={tour.name}
        description={tour.description ? tour.description : null}
        guides={tour.guides}
      />

      {tour.images && tour.images.length > 0 && (
        <TourPictures images={tour.images} />
      )}

      {tour.locations && tour.locations.length > 0 && (
        <MapBox locations={tour.locations} />
      )}

      {tour.reviews && tour.reviews.length > 0 && (
        <Testimonials reviews={tour.reviews} />
      )}

      <BookTour tourId={tour.id} slug={tour.name} />
    </>
  );
}

export default TourDetails;
