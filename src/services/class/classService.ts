import apiClient from "../apiClient";
import { UserClassesResponse } from "../../types/classTypes";

export interface ClassCreateData {
  name: string;
  description?: string;
  visibility: string;
  mainImageUrl?: string;
}

export const fetchUserClasses = async (): Promise<UserClassesResponse> => {
  const response = await apiClient.get("/classes");
  return response.data;
};

export const createClass = async (classData: ClassCreateData) => {
  const response = await apiClient.post("/classes", classData);
  return response.data.class;
};
