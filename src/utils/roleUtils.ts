import { CLASS_ROLES } from "../constants/role";
import { Class } from "../types/classTypes";

export const isInstructor = (selectedClass: Class | null): boolean => {
  return (
    selectedClass?.members?.some(
      (member) => member.role === CLASS_ROLES.INSTRUCTOR
    ) ?? false
  );
};

export const isStudent = (selectedClass: Class | null): boolean => {
  return (
    selectedClass?.members?.some(
      (member) => member.role === CLASS_ROLES.STUDENT
    ) ?? false
  );
};
