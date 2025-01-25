import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Unit, Subunit } from "../../../../types/unitTypes";
import { useOutletContext } from "react-router-dom";
import ContentInput from "../../../../components/common/ContentInput";

interface OutletContext {
  selectedUnit: Unit | null;
  selectedSubunit: Subunit | null;
}

const UnitDetailPage: React.FC = () => {
  const { selectedUnit, selectedSubunit } = useOutletContext<OutletContext>();

  if (!selectedUnit) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h5">단원이 설정되지 않습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
          height: "10%", // 화면의 10%만 차지
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {selectedUnit.name}
        </Typography>
        {selectedUnit.description && (
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {selectedUnit.description}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: 2,
          overflowY: "auto", // 소단원 내용이 길 경우 스크롤
        }}
      >
        {selectedSubunit ? (
          <>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              {selectedSubunit.name}
            </Typography>

            {selectedSubunit.description && (
              <Typography
                variant="body2"
                sx={{ opacity: 0.8, marginBottom: 2 }}
              >
                {selectedSubunit.description}
              </Typography>
            )}

            {selectedSubunit.content && (
              <ContentInput
                name="content"
                label="소단원 내용"
                initialContent={selectedSubunit.content}
                readOnly={true}
              />
            )}

            {selectedSubunit.materials_path && (
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  첨부파일
                </Typography>
                <Link
                  href={selectedSubunit.materials_path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedSubunit.materials_path.split("/").pop() ||
                    "첨부파일"}
                </Link>
              </Box>
            )}
          </>
        ) : (
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            소단원이 설정되지 않았습니다.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UnitDetailPage;
