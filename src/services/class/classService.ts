import apiClient from "../apiClient";

export interface ClassItem {
  id: string;
  name: string;
  visibility: string;
  created_at: string;
}

export interface UserClassesResponse {
  status: string;
  created_classes: ClassItem[];
  joined_classes: ClassItem[];
}

export interface ClassCreateData {
  name: string;
  description?: string;
  visibility: string;
  mainImageUrl?: string;
}

export interface UnitsResponse {
  status: string;
  message: string;
  units: Unit[];
}

export interface Unit {
  id: number;
  name: string;
  description: string;
  subunits: Subunit[];
}

export interface Subunit {
  id: number;
  name: string;
  description: string;
}

export const fetchUserClasses = async (): Promise<UserClassesResponse> => {
  const response = await apiClient.get("/classes");
  return response.data;
};

export const createClass = async (classData: ClassCreateData) => {
  const response = await apiClient.post("/classes", classData);
  return response.data.class;
};

export const fetchUnitsWithSubunits = async (
  classId: number
): Promise<UnitsResponse[]> => {
  const response = await apiClient.get(`/classes/${classId}/units`);
  return response.data.units;
};
