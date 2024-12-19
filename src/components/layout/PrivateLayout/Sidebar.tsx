import React, { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import ClassList from "../../sidebar/ClassList";
import ClassActionButton from "../../sidebar/ClassActionButton";

const Sidebar: React.FC = () => {
  const [isCreatedOpen, setIsCreatedOpen] = useState(true);
  const [isJoinedOpen, setIsJoinedOpen] = useState(true);

  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          sx={{ padding: "16px", cursor: "pointer" }}
          onClick={() => setIsCreatedOpen(!isCreatedOpen)}
        >
          <Typography variant="subtitle1">생성한 클래스</Typography>
        </Box>
        <Collapse in={isCreatedOpen}>
          <ClassList />
        </Collapse>
        <Box
          sx={{ padding: "16px", cursor: "pointer" }}
          onClick={() => setIsJoinedOpen(!isJoinedOpen)}
        >
          <Typography variant="subtitle1">참가한 클래스</Typography>
        </Box>
        <Collapse in={isJoinedOpen}>
          <ClassList />
        </Collapse>
      </Box>
      <ClassActionButton />
    </Box>
  );
};

export default Sidebar;
