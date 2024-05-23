import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUser as updateUserAPI,
  deactivateUser as deleteUserAPI,
} from "../../../api/userApi";
import toast from "react-hot-toast";

export function useUserActions() {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: ({ name, email, role, userId }) =>
      updateUserAPI({ name, email, role, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("You have updated the user successfully");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to update review");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => deleteUserAPI(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("You have deleted the user successfully");
    },
    onError: (err) => {
      toast.error("Failed to delete the user");
    },
  });

  return {
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isLoading,
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isLoading,
  };
}
