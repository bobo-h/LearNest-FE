import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useJoinClass } from "../../../hooks/useInvites";

const InvitePage: React.FC = () => {
  const { classId, token } = useParams<{ classId: string; token: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: joinClass, isPending } = useJoinClass();

  console.log("📌 현재 경로:", location.pathname);
  console.log("📌 useParams() 값:", { classId, token });

  useEffect(() => {
    // if (isLoading) return; // 로그인 상태 확인 중이면 대기

    if (!user) {
      console.log("🔴 사용자 인증 필요, 로그인 페이지로 이동");
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    if (!classId || !token) {
      console.error("❌ URL 매개변수(classId 또는 token)가 없음");
      return;
    }

    if (user && classId && token) {
      joinClass(
        { classId: Number(classId), token },
        {
          onSuccess: () => {
            alert("클래스에 성공적으로 참가했습니다.");
          },
          onError: (error) => {
            alert("클래스 참가에 실패했습니다: " + error.message);
            navigate("/app/main");
          },
        }
      );
    }
  }, [user, classId, token, navigate, joinClass, location.pathname]);

  return <div>{isPending ? "참가 처리 중..." : "클래스 참가 준비 중..."}</div>;
};

export default InvitePage;
