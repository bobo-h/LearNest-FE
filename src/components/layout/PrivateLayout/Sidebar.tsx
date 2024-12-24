import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { SidebarItems } from "../../sidebar/SidebarItems";
import { useAuth } from "../../../contexts/AuthContext";
import ClassActionButton from "./../../sidebar/ClassActionButton";

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role === "admin" ? "admin" : "user";
  const items = SidebarItems[role];

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          const query = item.useQuery ? item.useQuery() : null;

          return (
            <React.Fragment key={item.id}>
              <ListItemButton onClick={() => handleToggle(item.id)}>
                <ListItemText primary={item.name} />
                {openItems[item.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openItems[item.id]} timeout="auto" unmountOnExit>
                <Box sx={{ pl: 4 }}>
                  {query?.isLoading ? (
                    <CircularProgress size={24} />
                  ) : query?.error ? (
                    <Typography variant="body2" color="error">
                      데이터를 가져오는 중 오류가 발생했습니다.
                    </Typography>
                  ) : query?.data && query.data.length > 0 ? (
                    query.data.map((child: any) => (
                      <ListItemButton
                        key={child.id}
                        component="a"
                        href={`/${item.id}/${child.id}`}
                      >
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    ))
                  ) : (
                    <Typography variant="body2">항목이 없습니다.</Typography>
                  )}
                </Box>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
      {role === "user" && (
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        >
          <ClassActionButton />
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
