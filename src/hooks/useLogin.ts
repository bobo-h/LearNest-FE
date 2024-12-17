import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth/loginService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.user) {
        loginContext(data.user);
        navigate("/");
      }
    },
  });
};
