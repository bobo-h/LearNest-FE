import apiClient from "../apiClient";
import { UserResponse } from "../../types/userTypes";

export const fetchUserProfile = async (): Promise<UserResponse> => {
  const response = await apiClient.get("/users/me");
  return response.data;
};
