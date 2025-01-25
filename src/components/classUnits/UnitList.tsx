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
    <Box>
      {units.length > 0 ? (
        <List>
          {units.map((unit) => (
            <React.Fragment key={unit.id}>
              <ListItemButton onClick={() => onUnitSelect(unit)}>
                <ListItemText primary={unit.name} />
              </ListItemButton>
              {unit.subunits && unit.subunits.length > 0 && (
                <List>
                  {unit.subunits.map((subunit) => (
                    <ListItem key={subunit.id}>
                      <ListItemButton onClick={() => onSubunitSelect(subunit)}>
                        <ListItemText primary={subunit.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography>설정된 학습 내용이 없습니다</Typography>
      )}
    </Box>
  );
};

export default UnitList;
