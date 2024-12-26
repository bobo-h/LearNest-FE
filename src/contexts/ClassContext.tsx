import React, { createContext, useContext, useState, ReactNode } from "react";

interface Class {
  id: number;
  name: string;
  visibility: "public" | "private";
  created_at: Date;
  created_by: number;
}

interface ClassContextValue {
  classes: Class[];
  addClass: (newClass: Class) => void;
}

const ClassContext = createContext<ClassContextValue | undefined>(undefined);

interface ClassProviderProps {
  children?: ReactNode;
}

export const ClassProvider = ({ children }: ClassProviderProps) => {
  const [classes, setClasses] = useState<Class[]>([]);

  const addClass = (newClass: Class) => {
    setClasses((prev) => [...prev, newClass]);
  };

  return (
    <ClassContext.Provider value={{ classes, addClass }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClassContext = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error("useClassContext must be used within a ClassProvider");
  }
  return context;
};
