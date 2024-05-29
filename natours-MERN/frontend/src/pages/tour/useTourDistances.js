import { useQuery } from "@tanstack/react-query";
import { getToursByDistance } from "../../api/tourApi";

export function useTourDistances(latitude, longitude) {
  const {
    isLoading,
    data: toursByDistance,
    error,
  } = useQuery({
    queryKey: ["tours", latitude, longitude],
    queryFn: () => getToursByDistance(latitude, longitude),
    enabled: !!latitude && !!longitude,
  });

  return { isLoading, toursByDistance, error };
}
