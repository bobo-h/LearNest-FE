import React from "react";
import { Box, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditUnitList from "../components/classUnits/EditUnitList";
import { useUnitContext } from "../contexts/UnitContext";
import { useFetchUnitsWithSubunits } from "../hooks/useUnits";

const UnitsEditorLayout: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { units, subunits, setUnits, setSubunits, clearUnitChanges } =
    useUnitContext();
  const { mutate, isPending } = useFetchUnitsWithSubunits(Number(classId));
  console.log("Units: ", units);
  console.log("Subunits: ", subunits);

  const handleSave = () => {
    const changedUnits = units.filter(
      (unit) => unit.type || unit.subunits.some((subunit) => subunit.type)
    );

    if (changedUnits.length === 0) {
      alert("변경 사항이 없습니다.");
      return;
    }

    mutate(changedUnits, {
      onSuccess: () => {
        clearUnitChanges();
        alert("변경 사항이 저장되었습니다.");
      },
      onError: (error: any) => {
        console.error("Error saving changes:", error);
        alert("저장 중 문제가 발생했습니다.");
      },
    });
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <EditUnitList
        units={units}
        setUnits={setUnits}
        subunits={subunits}
        setSubunits={setSubunits}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
          width: "70%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ccc",
            borderRadius: 1,
            overflowY: "auto",
            marginLeft: 2,
          }}
        >
          <Outlet context={{ units, setUnits, subunits, setSubunits }} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <Button variant="contained" onClick={handleSave} disabled={isPending}>
            설정 완료
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UnitsEditorLayout;
