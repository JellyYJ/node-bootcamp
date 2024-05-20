import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview as createReviewAPI } from "../../../api/api";
import toast from "react-hot-toast";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: ({ rating, review, tourId }) =>
      createReviewAPI({ rating, review, tourId }),
    onSuccess: (review) => {
      if (review) {
        queryClient.setQueryData(["reviews"], (old) => [...old, review]);
        toast.success("You have created a review");
      }
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Something went wrong");
    },
  });

  return { createReview, isCreating };
}
