import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import MemberList from "../../components/class/MemberList";
import { useGetClassMembers } from "../../hooks/useClasses";

const MembersLayout: React.FC = () => {
  const { classId, userId } = useParams<{ classId: string; userId?: string }>();

  const { data, isLoading, error } = useGetClassMembers(Number(classId));

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
        <MemberList members={data?.members ?? []} message={data?.message} />
      </Box>

      {/* 멤버 관리 페이지 */}
      <Box sx={{ flex: 7, p: 2 }}>
        {userId ? (
          <Outlet context={{ members: data?.members ?? [] }} />
        ) : (
          <Typography sx={{ fontSize: "1rem", textAlign: "center", mt: 4 }}>
            멤버명(이메일)에서 멤버를 클릭해 학습 관리를 시작해보세요.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MembersLayout;
