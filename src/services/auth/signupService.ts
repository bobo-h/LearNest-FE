import apiClient from "../apiClient";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface SignupResponse {
  status: string;
  message: string;
  user: {
    name: string;
  };
}

export const signup = async (
  data: SignupData
): Promise<{ user: SignupResponse["user"]; token: string }> => {
  const { birthDate, ...otherData } = data;
  const requestData = {
    ...otherData,
    birth_date: birthDate,
  };
  console.log("📢 회원가입 요청 데이터:", requestData);

  const response = await apiClient.post("/auth/signup", requestData);
  const token = response.headers["authorization"]?.split(" ")[1]; // 'Bearer <token>'에서 토큰만 추출
  return {
    user: response.data.user,
    token: token || "",
  };
};
