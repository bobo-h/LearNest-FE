import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Unit, Subunit } from "../types/unitTypes";

type UnitContextType = {
  units: Unit[];
  subunits: Subunit[];
  setUnits: Dispatch<SetStateAction<Unit[]>>;
  setSubunits: Dispatch<SetStateAction<Subunit[]>>;
  clearUnitChanges: () => void;
};

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [subunits, setSubunits] = useState<Subunit[]>([]);

  const clearUnitChanges = () => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) => ({
        ...unit,
        type: undefined,
      }))
    );
    setSubunits((prevSubunits) =>
      prevSubunits.map((subunit) => ({
        ...subunit,
        type: undefined,
      }))
    );
  };

  return (
    <UnitContext.Provider
      value={{
        units,
        subunits,
        setUnits,
        setSubunits,
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
