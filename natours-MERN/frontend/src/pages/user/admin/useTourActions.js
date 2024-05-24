import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTour as createTourAPI,
  updateTour as updateTourAPI,
  deleteTour as deleteTourAPI,
} from "../../../api/tourApi";
import toast from "react-hot-toast";

export function useTourActions() {
  const queryClient = useQueryClient();

  const createTourMutation = useMutation({
    mutationFn: createTourAPI,
    onSuccess: (newTour) => {
      if (newTour) {
        queryClient.setQueryData(["tours"], (old) => [...old, newTour]);
        toast.success("Tour created successfully");
      }
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Something went wrong when creating the tour");
    },
  });

  const updateTourMutation = useMutation({
    mutationFn: ({ formData, tourId }) => updateTourAPI({ formData, tourId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      toast.success("You have updated the tour successfully");
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to update the tour");
    },
  });

  const deleteTourMutation = useMutation({
    mutationFn: (tourId) => deleteTourAPI(tourId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      toast.success("You have deleted the tour successfully");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to delete the tour");
    },
  });

  return {
    createTour: createTourMutation.mutate,
    isCreating: createTourMutation.isLoading,
    updateTour: updateTourMutation.mutate,
    isUpdating: updateTourMutation.isLoading,
    deleteTour: deleteTourMutation.mutate,
    isDeleting: deleteTourMutation.isLoading,
  };
}
