import React from "react";
import { Box } from "@mui/material";
import Header from "../components/layout/PublicLayout/Header";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ padding: "16px" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PublicLayout;
