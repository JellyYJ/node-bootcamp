import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTour as createTourAPI } from "../../../api/api";
import toast from "react-hot-toast";

export function useCreateTour() {
  const queryClient = useQueryClient();

  const { mutate: createTour, isLoading: isCreating } = useMutation({
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

  return { createTour, isCreating };
}
