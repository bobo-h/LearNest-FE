import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Unit, Subunit } from "../../types/unitTypes";

interface UnitListProps {
  units: Unit[];
  onUnitSelect: (unit: Unit) => void;
  onSubunitSelect: (subunit: Subunit) => void;
}

const UnitList: React.FC<UnitListProps> = ({
  units,
  onUnitSelect,
  onSubunitSelect,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        paddingRight: 2,
      }}
    >
      {units.length > 0 ? (
        <List>
          {units.map((unit) => (
            <React.Fragment key={unit.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => onUnitSelect(unit)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                    },
                  }}
                >
                  <ListItemText
                    primary={unit.name}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {unit.subunits && unit.subunits.length > 0 && (
                <List sx={{ paddingLeft: 2 }}>
                  {unit.subunits.map((subunit) => (
                    <ListItem key={subunit.id} disablePadding>
                      <ListItemButton
                        onClick={() => onSubunitSelect(subunit)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "primary.light",
                            color: "primary.contrastText",
                          },
                        }}
                      >
                        <ListItemText
                          primary={subunit.name}
                          primaryTypographyProps={{
                            fontSize: "0.875rem",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
            padding: 2,
          }}
        >
          설정된 학습 내용이 없습니다.
        </Typography>
      )}
    </Box>
  );
};

export default UnitList;
