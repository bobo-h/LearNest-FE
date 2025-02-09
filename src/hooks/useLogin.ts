import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth/loginService";
import { useAuth } from "../contexts/AuthContext";

export const useLogin = () => {
  const { login: loginContext } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.user && data?.token) {
        loginContext(data.user, data.token);
      }
      alert(`${data.user.name}님 환영합니다.`);
    },
    onError: (error: any) => {
      console.error("Login Error:", error);
    },
  });
};
