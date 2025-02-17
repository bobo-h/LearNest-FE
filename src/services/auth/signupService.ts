import { SignupFormData, SignupResponse } from "types/authTypes";
import apiClient from "../apiClient";

export const signup = async (
  data: SignupFormData
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
