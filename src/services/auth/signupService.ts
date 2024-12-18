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
  try {
    const { birthDate, ...otherData } = data;
    const requestData = {
      ...otherData,
      birth_date: birthDate,
    };

    const response = await apiClient.post("/auth/signup", requestData);
    const token = response.headers["authorization"]?.split(" ")[1];
    return {
      user: response.data.user,
      token: token || "",
    };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
};
