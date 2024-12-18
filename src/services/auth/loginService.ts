import apiClient from "../apiClient";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message: string;
  user: {
    name: string;
  };
}

export const login = async (
  data: LoginData
): Promise<{ user: LoginResponse["user"]; token: string }> => {
  const response = await apiClient.post("/auth/login", data);
  const token = response.headers["authorization"]?.split(" ")[1]; // 'Bearer <token>'에서 토큰만 추출
  return {
    user: response.data.user,
    token: token || "",
  };
};
