import apiClient from "../apiClient";
import { LoginFormData, LoginResponse } from "../../types/authTypes";

export const login = async (
  data: LoginFormData
): Promise<{ user: LoginResponse["user"]; token: string }> => {
  const response = await apiClient.post("/auth/login", data);
  const token = response.headers["authorization"]?.split(" ")[1];
  return {
    user: response.data.user,
    token: token || "",
  };
};
