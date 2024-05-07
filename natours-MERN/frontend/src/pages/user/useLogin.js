import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";

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
        navigate("/");
      }
    },

    onError: (err) => {
      console.log("ERROR", err);
      alert("The password/email was incorrect");
    },
  });

  return { login, isLogging };
}
