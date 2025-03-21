import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>클래스 대시보드</h1>
      <p>환영합니다, {user?.name}님!</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default DashboardPage;
