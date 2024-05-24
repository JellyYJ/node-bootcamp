import { useQuery } from "@tanstack/react-query";
import { getLogInUser } from "../../api/userApi";

export function useMe() {
  const { isPending, data: me } = useQuery({
    queryKey: ["user"],
    queryFn: getLogInUser,
  });
  // console.log("from useUser:", user);
  return { isPending, me };
}
