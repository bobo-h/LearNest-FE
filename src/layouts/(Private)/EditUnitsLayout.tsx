import React, {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Box, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditUnitList from "../../components/classUnits/EditUnitList";
import {
  useGetUnitsWithSubunits,
  useFetchUnitsWithSubunits,
} from "../../hooks/useUnits";
import { useUnitContext } from "../../contexts/UnitContext";

const EditUnitsLayout: React.FC = () => {
  const { units, setUnits, clearUnitChanges } = useUnitContext();
  const { classId } = useParams<{ classId: string }>();
  const { mutate, isPending } = useFetchUnitsWithSubunits(Number(classId));
  const { data: unitsResponse } = useGetUnitsWithSubunits(Number(classId));

  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [selectedSubunitId, setSelectedSubunitId] = useState<number | null>(
    null
  );

  const routerNavigate = useNavigate();
  const navigate = useCallback(
    (path: string) => {
      routerNavigate(path);
    },
    [routerNavigate]
  );

  useEffect(() => {
    if (unitsResponse?.units) {
      setUnits(unitsResponse.units);
    }
  }, [unitsResponse]);

  console.log("Units", units);

  useEffect(() => {
    if (units.length > 0 && selectedUnitId === null) {
      const firstUnit = units[0];
      setSelectedUnitId(firstUnit.id);
      navigate(`units/${firstUnit.id}`);
    }
  }, [selectedUnitId, navigate]);

  const handleSave = () => {
    // 변경된 units 필터링
    const changedUnits = units.filter(
      (unit) => unit.type || unit.subunits.some((subunit) => subunit.type)
    );
    if (changedUnits.length === 0) {
      alert("변경 사항이 없습니다.");
      return;
    }
    // json 문자열로 변환
    const transformedUnits = changedUnits.map((unit) => ({
      ...unit,
      subunits: unit.subunits.map((subunit) => ({
        ...subunit,
        content:
          typeof subunit.content === "object"
            ? JSON.stringify(subunit.content)
            : subunit.content,
      })),
    }));

    mutate(transformedUnits, {
      onSuccess: () => {
        clearUnitChanges();
        alert("변경 사항이 저장되었습니다.");
        navigate(`/app/class-management/${classId}/units`);
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
        selectedUnitId={selectedUnitId}
        setSelectedUnitId={setSelectedUnitId}
        selectedSubunitId={selectedSubunitId}
        setSelectedSubunitId={setSelectedSubunitId}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 2,
          width: "80%",
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
          <Outlet
            context={{ units, setUnits, selectedUnitId, selectedSubunitId }}
          />
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

export default EditUnitsLayout;
