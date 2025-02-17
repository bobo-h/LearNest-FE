import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth/loginService";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: ({ token, user }) => {
      if (token) {
        sessionStorage.setItem("accessToken", token);
      }
      return user;
    },
    onError: (error: any) => {
      console.error("Login Error:", error);
    },
  });
};
