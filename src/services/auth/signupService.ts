import apiClient from '../apiClient';

export interface SignupData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface SignupResponse {
  status: string;
  message: string;
  user?: {
    name: string;
  };
}

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await apiClient.post('/auth/signup', data);
  const token = response.headers['authorization']?.split(' ')[1];
  if (token) sessionStorage.setItem('accessToken', token);
  return response.data as SignupResponse;
};
