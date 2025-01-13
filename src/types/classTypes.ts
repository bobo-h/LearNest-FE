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

export interface UnitsResponse {
  status: string;
  message: string;
  units: Unit[];
}

export interface Unit {
  id: number;
  class_id: number;
  name: string;
  description: string;
  subunits: Subunit[];
}

export interface Subunit {
  id: number;
  unit_id: number;
  name: string;
  description: string;
  content: any;
  materials_path: string;
}
