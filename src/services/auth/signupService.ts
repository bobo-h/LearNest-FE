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
    role: string;
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

  const response = await apiClient.post("/auth/signup", requestData);
  const token = response.headers["authorization"]?.split(" ")[1];
  return {
    user: response.data.user,
    token: token || "",
  };
};
