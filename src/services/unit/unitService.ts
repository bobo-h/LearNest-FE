import apiClient from "../apiClient";
import { UnitsResponse, Unit } from "../../types/unitTypes";

export const getUnitsWithDetails = async (
  classId: number
): Promise<UnitsResponse> => {
  const response = await apiClient.get(`/classes/${classId}/units`);
  return response.data;
};

export const batchProcessUnits = async (
  classId: number,
  units: Unit[]
): Promise<void> => {
  await apiClient.post(`/classes/${classId}/units`, { units });
};
