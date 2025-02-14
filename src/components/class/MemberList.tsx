import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ClassMember } from "types/classTypes";

interface MemberListProps {
  members: ClassMember[];
  message?: string;
}

const MemberList: React.FC<MemberListProps> = ({ members, message }) => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();

  const handleMemberClick = (userId: number) => {
    navigate(`/app/classes/${classId}/members/${userId}`);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>멤버명(이메일)</TableCell>
            <TableCell>관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(members) && members.length > 0 ? (
            members.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  onClick={() => handleMemberClick(member.user_id)}
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "primary.main",
                    "&:hover": { color: "primary.dark" },
                  }}
                >
                  {member.user.name} ({member.user.email})
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                {message ?? "멤버가 없습니다."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemberList;
