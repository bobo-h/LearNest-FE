export interface UnitsResponse {
  status: string;
  message: string;
  units: Unit[];
}

export interface Unit {
  type?: "create" | "update" | "delete";
  id: number;
  name: string;
  description: string | null;
  subunits: Subunit[];
}

export interface Subunit {
  type?: "create" | "update" | "delete";
  id: number;
  unit_id: number;
  name: string;
  description: string | null;
  content: any | null;
  materials_path?: string | null;
}
