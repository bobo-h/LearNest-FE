import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Unit, Subunit } from "../../types/classTypes";

const EditUnitList: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleAddUnit = () => {
    const newUnit: Unit = {
      id: Date.now(),
      class_id: Number(classId),
      name: `단원 ${units.length + 1}`,
      description: "",
      subunits: [],
    };
    setUnits([...units, newUnit]);
    setErrorMessage("");
  };

  const handleAddSubunit = () => {
    if (!selectedUnitId) {
      setErrorMessage("단원을 먼저 선택해주세요.");
      return;
    }

    const updatedUnits = units.map((unit) => {
      if (unit.id === selectedUnitId) {
        const newSubunit: Subunit = {
          id: Date.now(),
          unit_id: selectedUnitId,
          name: `소단원 ${unit.subunits.length + 1}`,
          description: "",
          content: null,
          materials_path: "",
        };
        return {
          ...unit,
          subunits: [...unit.subunits, newSubunit],
        };
      }
      return unit;
    });

    setUnits(updatedUnits);
    setErrorMessage("");
  };

  const handleSelectUnit = (unitId: number) => {
    setSelectedUnitId(unitId);
    navigate(
      `/app/class-management/${classId}/units-edit/unit/${unitId}/detail`
    );
    setErrorMessage("");
  };

  const handleSelectSubunit = (unitId: number, subunitId: number) => {
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
                {unit.subunits.map((subunit) => (
                  <ListItemButton
                    key={subunit.id}
                    sx={{ pl: 4 }}
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

      {errorMessage && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}

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
            <Button variant="outlined" size="small">
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
            <Button variant="outlined" size="small">
              -
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUnitList;
