import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import MemberList from "../../components/class/MemberList";
import { useGetClassMembers } from "../../hooks/useClasses";

const MembersLayout: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();

  const {
    data: members = [],
    isLoading,
    error,
  } = useGetClassMembers(Number(classId));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error">
        멤버 정보를 불러오는 중 오류가 발생했습니다.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* 멤버 리스트 (2:8 비율) */}
      <Box sx={{ flex: 3, borderRight: 1, borderColor: "divider", p: 2 }}>
        <MemberList members={members} />
      </Box>

      {/* 멤버 관리 페이지 */}
      <Box sx={{ flex: 7, p: 2 }}>
        <Outlet context={{ members }} />
      </Box>
    </Box>
  );
};

export default MembersLayout;
