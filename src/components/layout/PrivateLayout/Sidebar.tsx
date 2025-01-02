import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SidebarItems } from "../../sidebar/SidebarItems";
import { useAuth } from "../../../contexts/AuthContext";
import ClassActionButton from "./../../sidebar/ClassActionButton";
import { useGetUserClasses } from "../../../hooks/useClasses";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role === "admin" ? "admin" : "user";
  const items = SidebarItems[role];

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const { data: classData, isLoading, error } = useGetUserClasses();

  const handleToggle = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getClassData = (id: string) => {
    if (id === "created_classes") {
      return classData?.created_classes || [];
    }
    if (id === "joined_classes") {
      return classData?.joined_classes || [];
    }
    return [];
  };

  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        border: "1px solid #ccc",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        {role === "admin" ? "관리자 메뉴" : "내 클래스"}
      </Typography>
      <List sx={{ flexGrow: 1, overflowY: "auto" }}>
        {items.map((item) => {
          const data = getClassData(item.id);

          return (
            <React.Fragment key={item.id}>
              <Typography
                variant="subtitle1"
                sx={{
                  p: 2,
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  borderRadius: "4px",
                  mx: 2,
                }}
              >
                {item.name}
              </Typography>
              <Box sx={{ px: 2 }}>
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : error ? (
                  <Typography variant="body2" color="error">
                    데이터를 가져오는 중 오류가 발생했습니다.
                  </Typography>
                ) : data.length > 0 ? (
                  data.map((child: any) =>
                    item.subMenu ? (
                      <React.Fragment key={child.id}>
                        <ListItemButton onClick={() => handleToggle(child.id)}>
                          <ListItemText primary={child.name} />
                          {openItems[child.id] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        <Collapse
                          in={openItems[child.id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ pl: 4 }}>
                            {item.subMenu?.map((subMenu) => (
                              <ListItemButton
                                key={subMenu.id}
                                component="a"
                                href={`/${item.id}/${child.id}/${subMenu.id}`}
                              >
                                <ListItemText primary={subMenu.name} />
                              </ListItemButton>
                            ))}
                          </Box>
                        </Collapse>
                      </React.Fragment>
                    ) : (
                      // 하위 메뉴가 없는 경우
                      <ListItemButton
                        key={child.id}
                        component="a"
                        href={`/${item.id}/${child.id}`}
                      >
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    )
                  )
                ) : (
                  <Typography variant="body2">항목이 없습니다.</Typography>
                )}
              </Box>
            </React.Fragment>
          );
        })}
      </List>
      {role === "user" && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <ClassActionButton />
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
