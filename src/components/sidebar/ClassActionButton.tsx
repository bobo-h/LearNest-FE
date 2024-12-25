import React, { useState } from "react";
import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ClassActionModal from "./ClassActionModal";

const ClassActionButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Fab
        color="primary"
        onClick={handleToggle}
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      >
        {isModalOpen ? <CloseIcon /> : <AddIcon />}
      </Fab>
      {isModalOpen && <ClassActionModal onClose={handleToggle} />}
    </Box>
  );
};

export default ClassActionButton;
