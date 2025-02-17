export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  user: {
    name: string;
  };
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface SignupResponse {
  status: string;
  message: string;
  user: {
    name: string;
  };
}
