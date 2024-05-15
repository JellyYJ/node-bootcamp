import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      // console.log("from useLogin", user);
      if (user) {
        queryClient.setQueryData(["user"], user);
        // queryClient.setQueriesData(["user"], user); //WRONG;
        toast.success("You have succeffully logged in");
        navigate("/");
      }
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("The password/email was incorrect");
    },
  });

  return { login, isLogging };
}
