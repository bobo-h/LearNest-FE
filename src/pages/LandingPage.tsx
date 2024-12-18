import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Our Platform</h1>
      <p>This is the landing page. Please log in or sign up to continue.</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => navigate("/login")}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
