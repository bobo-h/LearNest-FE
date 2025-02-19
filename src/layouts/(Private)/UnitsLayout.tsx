import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { Unit, Subunit } from "../../types/unitTypes";
import { useGetUnitsWithDetails } from "../../hooks/useUnits";
import UnitList from "../../components/class/UnitList";

const UnitsLayout: React.FC = () => {
  const { classId, unitId, subunitId } = useParams<{
    classId: string;
    unitId: string;
    subunitId: string;
  }>();
  const { data: unitsResponse } = useGetUnitsWithDetails(Number(classId));

  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedSubunit, setSelectedSubunit] = useState<Subunit | null>(null);

  const units = unitsResponse?.units || [];
  const routerNavigate = useNavigate();
  const navigate = useCallback(
    (path: string) => {
      routerNavigate(path);
    },
    [routerNavigate]
  );

  useEffect(() => {
    if (units.length > 0) {
      let foundUnit =
        units.find((unit) => unit.id === Number(unitId)) || units[0];
      let foundSubunit =
        foundUnit.subunits.find((sub) => sub.id === Number(subunitId)) ||
        foundUnit.subunits[0] ||
        null;

      setSelectedUnit(foundUnit);
      setSelectedSubunit(foundSubunit);

      if (!unitId || !subunitId) {
        if (foundSubunit) {
          navigate(`${foundUnit.id}/subunits/${foundSubunit.id}`);
        } else {
          navigate(`${foundUnit.id}`);
        }
      }
    }
  }, [units, unitId, subunitId, navigate]);

  const handleUnitSelect = (unit: Unit) => {
    const firstSubunit = unit.subunits[0] || null;
    setSelectedUnit(unit);
    setSelectedSubunit(firstSubunit);

    if (firstSubunit) {
      navigate(`${unit.id}/subunits/${firstSubunit.id}`);
    } else {
      navigate(`${unit.id}`);
    }
  };

  const handleSubunitSelect = (subunit: Subunit) => {
    if (selectedUnit) {
      setSelectedSubunit(subunit);
      navigate(`${selectedUnit.id}/subunits/${subunit.id}`);
    }
  };

  if (units.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h5">잠시 후 오픈됩니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ width: "20%", borderRight: "1px solid #ccc" }}>
        <UnitList
          units={units}
          onUnitSelect={handleUnitSelect}
          onSubunitSelect={handleSubunitSelect}
        />
      </Box>
      <Box sx={{ flex: 1, padding: 2 }}>
        <Outlet context={{ selectedUnit, selectedSubunit }} />
      </Box>
    </Box>
  );
};

export default UnitsLayout;
