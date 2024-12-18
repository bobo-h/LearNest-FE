import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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
