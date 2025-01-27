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
  description?: string;
  visibility: "public" | "private";
  mainImageUrl?: string;
}
