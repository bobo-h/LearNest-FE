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
  try {
    const response = await apiClient.post("/auth/login", data);
    const token = response.headers["authorization"]?.split(" ")[1]; // 'Bearer <token>'에서 토큰만 추출
    return {
      user: response.data.user,
      token: token || "",
    };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // 서버의 에러 메시지를 직접 던지게 함함
    }
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
};
