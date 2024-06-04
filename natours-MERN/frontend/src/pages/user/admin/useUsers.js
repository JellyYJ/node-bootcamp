import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../api/userApi";

export function useUsers() {
  const {
    isPending,
    data: users,
    error,
  } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  return { isPending, users, error };
}
