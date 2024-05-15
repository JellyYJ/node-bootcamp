import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../../api/api";

export function useMyReviews() {
  const { isPending, data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: getMyReviews,
  });
  return { isPending, reviews };
}
