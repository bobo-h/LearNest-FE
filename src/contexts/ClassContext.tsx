import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Class } from "../types/classTypes";

interface ClassContextProps {
  selectedClass: Class | null;
  setSelectedClass: Dispatch<SetStateAction<Class | null>>;
}

const ClassContext = createContext<ClassContextProps | undefined>(undefined);

interface ClassProviderProps {
  children?: ReactNode;
}

export const ClassProvider = ({ children }: ClassProviderProps) => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  return (
    <ClassContext.Provider
      value={{
        selectedClass,
        setSelectedClass,
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
