import React, { createContext, useContext, useState, ReactNode } from "react";
import { Class } from "../types/classTypes";

interface ClassContextProps {
  selectedClass: Class | null;
  selectClass: (classData: Class) => void;
}

const ClassContext = createContext<ClassContextProps | undefined>(undefined);

interface ClassProviderProps {
  children?: ReactNode;
}

export const ClassProvider = ({ children }: ClassProviderProps) => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const selectClass = (classData: Class) => {
    setSelectedClass(classData);
  };

  return (
    <ClassContext.Provider
      value={{
        selectedClass,
        selectClass,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => {
  const context = useContext(ClassContext);
  if (!context)
    throw new Error("useClassContext must be used within a ClassProvider");
  return context;
};
