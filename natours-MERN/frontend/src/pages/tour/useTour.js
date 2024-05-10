import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTour } from "../../api/api";

export function useTour() {
  const { tourId } = useParams();
  const {
    isPending,
    data: tour,
    error,
  } = useQuery({ queryKey: ["tour", tourId], queryFn: () => getTour(tourId) });

  // console.log("from useTour:", tour);
  return { isPending, tour, error };
}
