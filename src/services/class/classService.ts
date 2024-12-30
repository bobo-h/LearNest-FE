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

export const fetchUserClasses = async (): Promise<UserClassesResponse> => {
  try {
    const response = await apiClient.get("/classes");
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("클래스 목록 조회 중 오류가 발생했습니다.");
  }
};

export const createClass = async (classData: ClassCreateData) => {
  const response = await apiClient.post("/classes", classData);
  return response.data.class;
};
