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
    },
    onError: (error: any) => {
      // 서버의 에러 메시지를 그대로 전달
      if (error instanceof Error) {
        throw new Error(error.message); // LoginPage에서 메시지를 표시할 수 있도록 던짐
      }
    },
  });
};
