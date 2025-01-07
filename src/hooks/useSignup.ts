import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/auth/signupService";
import { useAuth } from "../contexts/AuthContext";

export const useSignup = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      if (data?.user && data?.token) {
        login(data.user, data.token);
      }
    },
    onError: (error: any) => {
      console.error("Signup Error:", error);
    },
  });
};
