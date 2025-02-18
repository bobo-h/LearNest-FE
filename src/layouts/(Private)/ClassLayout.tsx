import React, { useState } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import {
  Outlet,
  useNavigate,
  useLocation,
  useParams,
  matchPath,
  useOutletContext,
} from "react-router-dom";
import EditClassMemberModal from "../../components/modals/EditClassMemberModal";
import { Class } from "types/classTypes";
import { isInstructor } from "utils/roleUtils";

interface OutletContext {
  selectedClass: Class | null;
}

const ClassLayout: React.FC = () => {
  const { selectedClass } = useOutletContext<OutletContext>();
  const { classId } = useParams<{ classId: string }>();

  const [isMemberModalOpen, setMemberModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const editUnitsLayoutRoute = matchPath(
    `/app/classes/${classId}/units/*`,
    location.pathname
  );
  const manageMemberLayoutRoute = matchPath(
    `/app/classes/${classId}/members/*`,
    location.pathname
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2.2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar
            src={selectedClass?.main_image || undefined}
            alt={selectedClass?.name || "클래스 이미지"}
            sx={{
              width: 50,
              height: 50,
              bgcolor: "white",
              backgroundSize: "cover",
              backgroundPosition: "center",
              fontSize: "1.5rem",
            }}
          >
            {!selectedClass?.main_image &&
              (selectedClass?.name?.slice(0, 1) || "C")}
          </Avatar>

          <Box>
            <Typography variant="h6">{selectedClass?.name}</Typography>
            {selectedClass?.description && (
              <Typography
                variant="body2"
                sx={{ color: "primary.contrastText", opacity: 0.8 }}
              >
                {selectedClass.description}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {editUnitsLayoutRoute && isInstructor(selectedClass) && (
            <Button variant="contained" onClick={() => navigate("units-edit")}>
              학습 설정
            </Button>
          )}
          {manageMemberLayoutRoute && isInstructor(selectedClass) && (
            <Button
              variant="contained"
              onClick={() => setMemberModalOpen(true)}
            >
              멤버 설정
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Box>
      <EditClassMemberModal
        open={isMemberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        classId={Number(classId)}
      />
    </Box>
  );
};

export default ClassLayout;
