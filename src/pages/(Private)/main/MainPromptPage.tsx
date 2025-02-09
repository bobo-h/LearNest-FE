import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGetUserClasses } from "../../../hooks/useClasses";
import EditClassModal from "../../../components/modals/EditClassModal";
import JoinClassModal from "../../../components/modals/JoinClassModal";

const MainPromptPage: React.FC = () => {
  const { data: classes } = useGetUserClasses();
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {classes?.created_classes.length === 0 &&
      classes?.joined_classes.length === 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            새로운 클래스를 생성하거나 참가해보세요!
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setInviteModalOpen(true)}
            >
              생성하기
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setJoinModalOpen(true)}
            >
              참가하기
            </Button>
          </Box>
          <EditClassModal
            open={isInviteModalOpen}
            onClose={() => setInviteModalOpen(false)}
            mode="create"
          />
          <JoinClassModal
            open={isJoinModalOpen}
            onClose={() => setJoinModalOpen(false)}
          />
        </>
      ) : (
        <Typography variant="h6">
          나의 클래스에서 참여할 클래스를 선택해주세요
        </Typography>
      )}
    </Box>
  );
};

export default MainPromptPage;
