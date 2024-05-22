import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTour as updateTourAPI } from "../../../api/api";
import toast from "react-hot-toast";

export function useUpdateTour() {
  const queryClient = useQueryClient();

  const { mutate: updateTour, isLoading: isUpdating } = useMutation({
    mutationFn: ({ formData, tourId }) => updateTourAPI({ formData, tourId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      toast.success("You have updated the tour successfully");
    },
    onError: (err) => {
      toast.error("Failed to update the tour");
    },
  });

  return { isUpdating, updateTour };
}
