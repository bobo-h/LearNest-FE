export interface UserResponse {
  status: string;
  message: string;
  user: UserProfile;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  birth_date: string;
  role: "user" | "admin";
  created_at?: Date;
  updated_at?: Date;
}
