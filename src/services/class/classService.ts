import apiClient from "../apiClient";
import { UserClassesResponse } from "../../types/classTypes";
import { ClassFormData } from "./../../types/classTypes";

export const fetchUserClasses = async (): Promise<UserClassesResponse> => {
  const response = await apiClient.get("/classes");
  return response.data;
};

export const createClass = async (classData: ClassFormData) => {
  const response = await apiClient.post("/classes", classData);
  return response.data.class;
};
