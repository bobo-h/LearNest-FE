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

export const updateClass = async ({
  classId,
  classData,
}: {
  classId: number;
  classData: ClassFormData;
}) => {
  const response = await apiClient.put(`/classes/${classId}`, classData);
  return response.data.class;
};

export const deleteClass = async (classId: number) => {
  const response = await apiClient.delete(`/classes/${classId}`);
  return response.data;
};
