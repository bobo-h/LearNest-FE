import React, { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";
import Header from "../../components/layout/PrivateLayout/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { useClassContext } from "../../contexts/ClassContext";
import { UnitProvider } from "../../contexts/UnitContext";
import { useGetUserProfile } from "hooks/useUsers";
import { useGetUserClasses } from "hooks/useClasses";

const PrivateLayout: React.FC = () => {
  const { setUser } = useAuth();
  const { data: fetchedUser, isLoading: userLoading } = useGetUserProfile();
  const { data: classData, isLoading: classLoading } = useGetUserClasses();
  const { classId } = useParams<{ classId: string }>();
  const { selectedClass, setSelectedClass } = useClassContext();

  useEffect(() => {
    if (classData && classId) {
      const foundClass =
        classData.created_classes.find((cls) => cls.id === Number(classId)) ||
        classData.joined_classes.find((cls) => cls.id === Number(classId));
      setSelectedClass(foundClass || null);
    }
  }, [classData, classId, setSelectedClass]);

  useEffect(() => {
    console.log("Fetched User:", fetchedUser?.user);
    if (fetchedUser?.user) {
      setUser(fetchedUser.user);
    }
  }, [fetchedUser]);

  if (userLoading || classLoading) {
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
    <UnitProvider>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header user={fetchedUser.user} />
        <Box sx={{ display: "flex", flex: 1 }}>
          <Sidebar
            classData={classData}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
          />
          <Box sx={{ flex: 4, padding: "16px" }}>
            <Outlet context={{ selectedClass }} />
          </Box>
        </Box>
      </Box>
    </UnitProvider>
  );
};

export default PrivateLayout;
