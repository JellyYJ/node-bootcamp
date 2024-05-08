import { useQuery } from "@tanstack/react-query";
import { getLogInUser } from "../../api/api";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getLogInUser,
  });
  // console.log("from useUser:", user);
  return { isPending, user };
}
