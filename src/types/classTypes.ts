export interface Class {
  id: number;
  name: string;
  main_image: string | null;
  description: string | null;
  visibility: "public" | "private";
  created_by: number;
  createdAt: string;
  updatedAt: string;
  members: { role: string }[];
}

export interface UserClassesResponse {
  status: string;
  created_classes: Class[];
  joined_classes: Class[];
}

export interface ClassFormData {
  name: string;
  description?: string | null;
  visibility: "public" | "private";
  mainImageUrl?: string | null;
}

export interface ClassMembersResponse {
  status: string;
  message: string;
  members: ClassMember[];
}

export interface ClassMember {
  id: number;
  user_id: number;
  class_id: number;
  role: "instructor" | "student";
  joined_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
