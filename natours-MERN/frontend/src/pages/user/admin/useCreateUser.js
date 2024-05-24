import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser as createUserAPI } from "../../../api/userApi";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading: isCreating } = useMutation({
    mutationFn: createUserAPI,
    onSuccess: (newUser) => {
      if (newUser) {
        queryClient.setQueryData(["users"], (old) => [...old, newUser]);
        toast.success("User created successfully");
      }
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Something went wrong when creating the user");
    },
  });

  return { createUser, isCreating };
}
