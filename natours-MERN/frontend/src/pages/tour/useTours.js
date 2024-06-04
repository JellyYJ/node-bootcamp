import { useQuery } from "@tanstack/react-query";
import { getTours } from "../../api/tourApi";

export function useTours() {
  const {
    isPending,
    data: tours,
    error,
  } = useQuery({ queryKey: ["tours"], queryFn: getTours });

  // console.log("from useTours:", tours);
  return { isPending, tours, error };
}
