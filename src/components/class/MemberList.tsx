import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { ClassMember } from "types/classTypes";

interface MemberListProps {
  members: ClassMember[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
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
                <TableCell>
                  {member.user.name} ({member.user.email})
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                멤버가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemberList;
