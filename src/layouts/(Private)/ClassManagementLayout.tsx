import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  matchPath,
} from "react-router-dom";
import { useClassContext } from "../../contexts/ClassContext";

const ClassManagementLayout: React.FC = () => {
  const { selectedClass } = useClassContext();
  const { classId } = useParams<{ classId: string }>();

  const navigate = useNavigate();
  const location = useLocation();
  const isUnitsLayoutRoute = matchPath(
    `/app/class-management/${classId}/units/*`,
    location.pathname
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Box>
          <Typography variant="h6">{selectedClass?.name}</Typography>
          {selectedClass?.description && (
            <Typography
              variant="body2"
              sx={{ color: "primary.contrastText", opacity: 0.8 }}
            >
              {selectedClass.description}
            </Typography>
          )}
        </Box>
        {isUnitsLayoutRoute && (
          <Button variant="contained" onClick={() => navigate("units-edit")}>
            학습 설정
          </Button>
        )}
      </Box>
      <Box sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ClassManagementLayout;
