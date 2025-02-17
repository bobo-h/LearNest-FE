import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import Header from "../../components/layout/PrivateLayout/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { ClassProvider } from "../../contexts/ClassContext";
import { UnitProvider } from "../../contexts/UnitContext";
import { useGetUserProfile } from "hooks/useUsers";

const PrivateLayout: React.FC = () => {
  const { setUser } = useAuth();
  const { data: fetchedUser, isLoading } = useGetUserProfile();

  useEffect(() => {
    console.log("Fetched User:", fetchedUser?.user);
    if (fetchedUser?.user) {
      setUser(fetchedUser.user);
    }
  }, [fetchedUser]);

  if (isLoading || fetchedUser?.user === undefined) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!fetchedUser?.user) {
    console.log("User not found, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  return (
    <ClassProvider>
      <UnitProvider>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <Header user={fetchedUser.user} />
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
