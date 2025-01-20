import React, { useState, Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Unit, Subunit } from "../../types/unitTypes";

interface EditUnitListProps {
  units: Unit[];
  setUnits: Dispatch<SetStateAction<Unit[]>>;
  subunits: Subunit[];
  setSubunits: Dispatch<SetStateAction<Subunit[]>>;
}

const EditUnitList: React.FC<EditUnitListProps> = ({
  units,
  setUnits,
  subunits,
  setSubunits,
}) => {
  const { classId: classIdParams } = useParams<{ classId: string }>();
  const classId = Number(classIdParams);
  const navigate = useNavigate();
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [selectedSubunitId, setSelectedSubunitId] = useState<number | null>(
    null
  );

  const handleAddUnit = () => {
    const newUnit: Unit = {
      type: "create",
      id: Date.now(),
      name: `단원 ${units.length + 1}`,
      description: "",
      subunits: [],
    };

    setUnits([...units, newUnit]);
  };

  const handleAddSubunit = () => {
    if (!selectedUnitId) {
      alert("소단원을 추가하려면 단원을 먼저 선택해주세요.");
      return;
    }
    const newSubunit: Subunit = {
      type: "create",
      id: Date.now(),
      unit_id: selectedUnitId,
      name: `소단원 ${
        subunits.filter((s) => s.unit_id === selectedUnitId).length + 1
      }`,
      description: "",
      content: "",
      materials_path: "",
    };

    setSubunits((prevSubunits) => [...prevSubunits, newSubunit]);

    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === selectedUnitId
          ? { ...unit, subunits: [...unit.subunits, newSubunit] }
          : unit
      )
    );
  };

  const handleRemoveUnit = () => {
    if (!selectedUnitId) {
      alert("삭제할 단원을 선택하세요.");
      return;
    }
    setUnits(
      (prevUnits) =>
        prevUnits
          .map((unit) =>
            unit.id === selectedUnitId
              ? unit.type === undefined
                ? { ...unit, type: "delete" }
                : null
              : unit
          )
          .filter((unit) => unit !== null) as Unit[]
    );
    setSubunits((prevSubunits: Subunit[]) =>
      prevSubunits.filter((subunit) => subunit.unit_id !== selectedUnitId)
    );
    setSelectedUnitId(null);
  };

  const handleRemoveSubunit = () => {
    if (!selectedUnitId) {
      alert("단원을 먼저 선택하세요.");
      return;
    }
    const subunitsInUnit = subunits.filter(
      (subunit) => subunit.unit_id === selectedUnitId
    );
    if (subunitsInUnit.length === 0) {
      alert("삭제할 소단원이 없습니다.");
      return;
    }
    const lastSubunit = subunitsInUnit[subunitsInUnit.length - 1];
    setSubunits(
      (prevSubunits) =>
        prevSubunits
          .map((subunit) =>
            subunit.id === lastSubunit.id
              ? subunit.type === undefined
                ? { ...subunit, type: "delete" }
                : null
              : subunit
          )
          .filter((subunit) => subunit !== null) as Subunit[]
    );
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === selectedUnitId
          ? {
              ...unit,
              subunits: unit.subunits.filter(
                (subunit) => subunit.id !== lastSubunit.id
              ),
            }
          : unit
      )
    );
  };

  const handleSelectUnit = (unitId: number) => {
    setSelectedUnitId(unitId);
    setSelectedSubunitId(null);
    navigate(
      `/app/class-management/${classId}/units-edit/unit/${unitId}/detail`
    );
  };

  const handleSelectSubunit = (unitId: number, subunitId: number) => {
    setSelectedUnitId(unitId);
    setSelectedSubunitId(subunitId);
    navigate(
      `/app/class-management/${classId}/units-edit/unit/${unitId}/subunit/${subunitId}/detail`
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 2,
        width: "30%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: 1,
          padding: 2,
          marginBottom: 2,
        }}
      >
        {units.length > 0 ? (
          <List>
            {units.map((unit) => (
              <React.Fragment key={unit.id}>
                <ListItemButton
                  selected={unit.id === selectedUnitId}
                  onClick={() => handleSelectUnit(unit.id)}
                >
                  <ListItemText primary={unit.name} />
                </ListItemButton>
                {subunits
                  .filter((subunit) => subunit.unit_id === unit.id)
                  .map((subunit) => (
                    <ListItemButton
                      key={subunit.id}
                      sx={{ pl: 4 }}
                      selected={subunit.id === selectedSubunitId}
                      onClick={() => handleSelectSubunit(unit.id, subunit.id)}
                    >
                      <ListItemText primary={`- ${subunit.name}`} />
                    </ListItemButton>
                  ))}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography>아직 단원이 없습니다.</Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="body1"
            sx={{ minWidth: "60px", textAlign: "center" }}
          >
            단원
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleAddUnit}>
              +
            </Button>
            <Button variant="outlined" size="small" onClick={handleRemoveUnit}>
              -
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="body1"
            sx={{ minWidth: "60px", textAlign: "center" }}
          >
            소단원
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleAddSubunit}>
              +
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleRemoveSubunit}
            >
              -
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUnitList;
