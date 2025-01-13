import React from "react";
import { Box, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import EditUnitList from "../components/classUnits/EditUnitList";

const UnitsEditorLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <EditUnitList />
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
          <Outlet />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
            gap: 3,
          }}
        >
          <Button variant="outlined">임시 저장</Button>
          <Button variant="contained">설정 완료</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UnitsEditorLayout;
