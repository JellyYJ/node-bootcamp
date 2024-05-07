import { useQuery } from "@tanstack/react-query";
import { getLogInUser } from "../../api/api";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getLogInUser,
  });
  // console.log("from useUser:", user);
  return { isLoading, user };
}
