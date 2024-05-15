import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe as updateMeAPI } from "../../api/api";
import toast from "react-hot-toast";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  const { mutate: updateMe, isLoading: isUpdating } = useMutation({
    mutationFn: updateMeAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountSetting"] });
      toast.success("You have updated your password");
    },
    onError: (err) => alert(err.message),
  });

  return { isUpdating, updateMe };
}
