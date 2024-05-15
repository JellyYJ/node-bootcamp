import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../api/api";
import toast from "react-hot-toast";

export function useSignUp() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created, please verify the email address"
      );
    },
  });
  return { isLoading, signup };
}
