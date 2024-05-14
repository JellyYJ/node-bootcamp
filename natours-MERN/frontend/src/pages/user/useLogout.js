import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../api/api";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      // since at login, we saved the user data to the cache
      queryClient.removeQueries();
      toast.success("You have succeffully logged out");
      // navigate("/login", { replace: true });
    },
  });
  return { logout, isPending };
}
