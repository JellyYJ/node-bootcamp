import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../../api/api";

export function useMyBookings() {
  const { isPending, data: tours } = useQuery({
    queryKey: ["tours"],
    queryFn: getMyBookings,
  });
  console.log("from useMyBookings:", tours);
  return { isPending, tours };
}
