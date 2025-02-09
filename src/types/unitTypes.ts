import { Delta } from "quill";

export interface UnitsResponse {
  status: string;
  message: string;
  units: Unit[];
}

export interface Unit {
  type?: "create" | "update" | "delete";
  id: number;
  sort_order: number;
  name: string;
  description: string | null;
  subunits: Subunit[];
}

export interface Subunit {
  type?: "create" | "update" | "delete";
  id: number;
  unit_id: number;
  sort_order: number;
  name: string;
  description: string | null;
  content: Delta | null;
  materials_path?: string | null;
  assignments?: Assignment[];
}

export interface Assignment {
  type?: "create" | "update" | "delete";
  id: number;
  subunit_id: number;
  title: string;
  content: Delta | null;
  attachment?: string | null;
}
