import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword as updatePasswordAPI } from "../../api/userApi";
import toast from "react-hot-toast";

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { mutate: updatePassword, isLoading: isUpdating } = useMutation({
    mutationFn: updatePasswordAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["password"] });
      toast.success("You have updated your password");
    },
    onError: (err) => alert(err.message),
  });

  return { isUpdating, updatePassword };
}
