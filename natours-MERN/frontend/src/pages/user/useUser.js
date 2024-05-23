import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/userApi";

export function useUser({ userId }) {
  const { isPending, data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  // console.log("from useUser:", user);
  return { isPending, user };
}
