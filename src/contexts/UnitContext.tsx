import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Unit } from "../types/unitTypes";

type UnitContextType = {
  units: Unit[];
  setUnits: Dispatch<SetStateAction<Unit[]>>;
  clearUnitChanges: () => void;
};

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<Unit[]>([]);

  const clearUnitChanges = () => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) => ({
        ...unit,
        type: undefined,
        subunits: unit.subunits.map((subunit) => ({
          ...subunit,
          type: undefined,
        })),
      }))
    );
  };

  return (
    <UnitContext.Provider
      value={{
        units,
        setUnits,
        clearUnitChanges,
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};

export const useUnitContext = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnitContext must be used within a UnitProvider");
  }
  return context;
};
