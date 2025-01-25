import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/material";
import Header from "../../components/layout/PrivateLayout/Header";
import Sidebar from "../../components/layout/PrivateLayout/Sidebar";
import { ClassProvider } from "../../contexts/ClassContext";
import { UnitProvider } from "../../contexts/UnitContext";

const PrivateLayout: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ClassProvider>
      <UnitProvider>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <Header />
          <Box sx={{ display: "flex", flex: 1 }}>
            <Sidebar />
            <Box sx={{ flex: 4, padding: "16px" }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </UnitProvider>
    </ClassProvider>
  );
};

export default PrivateLayout;
