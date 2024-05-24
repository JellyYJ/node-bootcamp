import { useQuery } from "@tanstack/react-query";
import { getToursData } from "../../api/tourApi";

export function useTours() {
  const {
    isPending,
    data: tours,
    error,
  } = useQuery({ queryKey: ["tours"], queryFn: getToursData });

  // console.log("from useTours:", tours);
  return { isPending, tours, error };
}
