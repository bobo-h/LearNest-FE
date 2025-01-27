import apiClient from "../apiClient";

export const InviteClass = async (
  classId: number
): Promise<{ inviteLink: string; expires_at: string }> => {
  const response = await apiClient.post(`/classes/${classId}/invite`);
  return response.data;
};

export const joinClass = async (
  classId: number,
  token: string
): Promise<{ message: string }> => {
  const response = await apiClient.post(`/classes/${classId}/invite/${token}`);
  return response.data;
};
