import apiClient from "../apiClient";
import { UnitsResponse, Unit } from "../../types/unitTypes";

export const getUnitsWithSubunits = async (
  classId: number
): Promise<UnitsResponse> => {
  const response = await apiClient.get(`/classes/${classId}/units`);
  return response.data.units;
};

export const fetchUnitsWithSubunits = async (
  classId: number,
  units: Unit[]
): Promise<void> => {
  await apiClient.post(`/classes/${classId}/units`, { units });
};
