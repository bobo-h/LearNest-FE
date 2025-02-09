import React from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Unit, Subunit } from "../../types/unitTypes";

interface EditUnitListProps {
  units: Unit[];
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>;
  selectedUnitId: number | null;
  setSelectedUnitId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedSubunitId: number | null;
  setSelectedSubunitId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditUnitList: React.FC<EditUnitListProps> = ({
  units,
  setUnits,
  selectedUnitId,
  setSelectedUnitId,
  selectedSubunitId,
  setSelectedSubunitId,
}) => {
  const navigate = useNavigate();

  const handleAddUnit = () => {
    const newUnit: Unit = {
      type: "create",
      id: Date.now(),
      sort_order: units.length + 1,
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
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === selectedUnitId
          ? {
              ...unit,
              subunits: [
                ...unit.subunits,
                {
                  type: "create",
                  id: Date.now(),
                  unit_id: selectedUnitId,
                  sort_order: unit.subunits.length + 1,
                  name: `소단원 ${unit.subunits.length + 1}`,
                  description: "",
                  content: null,
                  materials_path: "",
                },
              ],
            }
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
    setSelectedUnitId(null);
  };

  const handleRemoveSubunit = () => {
    if (!selectedSubunitId) {
      alert("삭제할 소단원을 선택하세요.");
      return;
    }

    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === selectedUnitId
          ? {
              ...unit,
              subunits: unit.subunits
                .map((subunit) =>
                  subunit.id === selectedSubunitId
                    ? subunit.type === undefined
                      ? { ...subunit, type: "delete" }
                      : null
                    : subunit
                )
                .filter((subunit) => subunit !== null) as Subunit[],
            }
          : unit
      )
    );
    setSelectedSubunitId(null);
  };

  const handleSelectUnit = (unitId: number) => {
    setSelectedSubunitId(null);
    setSelectedUnitId(unitId);
    navigate(`units/${unitId}`);
  };

  const handleSelectSubunit = (unitId: number, subunitId: number) => {
    setSelectedUnitId(unitId);
    setSelectedSubunitId(subunitId);
    navigate(`units/${unitId}/subunits/${subunitId}`);
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
            {units
              .filter((unit) => unit.type !== "delete")
              .map((unit) => (
                <React.Fragment key={unit.id}>
                  <ListItemButton
                    selected={
                      unit.id === selectedUnitId && selectedSubunitId === null
                    }
                    onClick={() => handleSelectUnit(unit.id)}
                  >
                    <ListItemText primary={unit.name} />
                  </ListItemButton>
                  {unit.subunits
                    .filter((subunit) => subunit.type !== "delete")
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
