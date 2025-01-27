import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import EditClassModal from "../modals/EditClassModal";
import JoinClassModal from "../modals/JoinClassModal";

const ClassActionModal: React.FC = () => {
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          bottom: "80px", // 버튼 위쪽에 위치 (버튼 높이 + 여백)
          right: "16px",
          width: "200px",
          padding: "16px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          zIndex: 10,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          새로운 클래스
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginBottom: "8px" }}
          onClick={() => setInviteModalOpen(true)}
        >
          생성하기
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setJoinModalOpen(true)}
        >
          참가하기
        </Button>
      </Box>
      <EditClassModal
        open={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
      <JoinClassModal
        open={isJoinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </>
  );
};

export default ClassActionModal;
