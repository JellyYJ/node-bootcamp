import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe as updateMeAPI } from "../../api/api";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  const { mutate: updateMe, isLoading: isUpdating } = useMutation({
    mutationFn: updateMeAPI,
    onSuccess: () => {
      alert("The setting has been updated successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => alert(err.message),
  });

  return { isUpdating, updateMe };
}
