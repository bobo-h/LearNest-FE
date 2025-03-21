import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import ProfileModal from "./../../modals/ProfileModal";
import { UserProfile } from "types/userTypes";

interface HeaderProps {
  user: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProfileClick = () => {
    setModalOpen(true);
  };

  const handleCloseProfile = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      <Box
        component="img"
        src="/LogoName.png"
        alt="LearNest Logo"
        sx={{ height: 50, cursor: "pointer" }}
        onClick={() => navigate("/app/main")}
      />
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={handleProfileClick}
      >
        <Typography sx={{ marginLeft: "8px", cursor: "pointer" }}>
          {user?.name}
        </Typography>
        <Avatar
          src="/profile-pic-placeholder.jpg"
          sx={{ bgcolor: "#ccc", marginLeft: "8px", cursor: "pointer" }}
        />
        <ProfileModal open={isModalOpen} onClose={handleCloseProfile} />
      </Box>
    </Box>
  );
};

export default Header;
