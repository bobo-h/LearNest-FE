import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/auth/signupService";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: ({ token, user }) => {
      if (token) {
        sessionStorage.setItem("accessToken", token);
      }
      return user;
    },
    onError: (error: any) => {
      console.error("Signup Error:", error);
    },
  });
};
