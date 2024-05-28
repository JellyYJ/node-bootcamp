import { useQuery } from "@tanstack/react-query";
import { getToursByDistance } from "../../api/tourApi";

export function useTourDistances() {
  const { isPending, data: toursByDistance } = useQuery({
    queryKey: ["tours"],
    queryFn: getToursByDistance,
  });

  return { isPending, toursByDistance };
}
