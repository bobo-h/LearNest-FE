import React, { useState } from "react";
import { Box } from "@mui/material";
import UnitList from "../../../components/classUnits/UnitList";
import UnitDetail from "../../../components/classUnits/UnitDetail";
import { Unit } from "../../../types/unitTypes";

const UnitsManagePage: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ width: "30%", borderRight: "1px solid #ccc", padding: 2 }}>
        <UnitList onSelect={(unit) => setSelectedUnit(unit)} />
      </Box>
      <Box sx={{ flex: 1, padding: 2 }}>
        <UnitDetail unit={selectedUnit} />
      </Box>
    </Box>
  );
};

export default UnitsManagePage;
