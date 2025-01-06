import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useGetUserClasses } from "../../../hooks/useClasses";
import ClassCreateModal from "../../../components/modals/ClassCreateModal";

const ClassPromptPage: React.FC = () => {
  const { data: classes } = useGetUserClasses();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateModalOpen = () => setIsCreateModalOpen(true);
  const handleCreateModalClose = () => setIsCreateModalOpen(false);

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
              onClick={handleCreateModalOpen}
            >
              생성하기
            </Button>
            <Button variant="outlined" color="primary">
              참가하기
            </Button>
          </Box>
          <ClassCreateModal
            open={isCreateModalOpen}
            onClose={handleCreateModalClose}
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

export default ClassPromptPage;
