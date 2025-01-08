import React, { createContext, useContext, useState, ReactNode } from "react";
import { useGetUserClasses } from "../hooks/useClasses";
import { Class } from "../types/classTypes";

interface ClassContextValue {
  createdClasses: Class[];
  joinedClasses: Class[];
}

const ClassContext = createContext<ClassContextValue | undefined>(undefined);

interface ClassProviderProps {
  children?: ReactNode;
}

export const ClassProvider = ({ children }: ClassProviderProps) => {
  const { data } = useGetUserClasses();

  const createdClasses = data?.created_classes ?? [];
  const joinedClasses = data?.joined_classes ?? [];

  return (
    <ClassContext.Provider
      value={{
        createdClasses,
        joinedClasses,
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
