import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>관리자 대시보드</h1>
      <p>관리자 {user?.name}님, 환영합니다!</p>
      <p>곧 통계 자료가 등록될 예정입니다.</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default AdminDashboardPage;
