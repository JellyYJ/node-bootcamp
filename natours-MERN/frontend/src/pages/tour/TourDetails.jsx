import Spinner from "../../components/Spinner";
import { useTour } from "./useTour";
import TourHeader from "./TourHeader";
import TourContents from "./TourContents";
import TourPictures from "./TourPictures";
import Empty from "../../components/Empty";
function TourDetails() {
  const { tour, isPending } = useTour();

  if (isPending) return <Spinner />;
  if (!tour) return <Empty></Empty>;
  console.log(tour);

  return (
    <>
      <TourHeader
        tour={tour}
        imageCover={tour.imageCover}
        name={tour.name}
        duration={tour.duration}
        startLocation={tour.startLocation}
      />
      <TourContents
        startDate={tour.startDates[0]}
        difficulty={tour.difficulty}
        maxGroupSize={tour.maxGroupSize}
        startLocation={tour.startLocation}
        ratingsAverage={tour.ratingsAverage}
        name={tour.name}
        description={tour.description}
        guides={tour.guides}
      />
      <TourPictures images={tour.images} />
    </>
  );
}

export default TourDetails;
