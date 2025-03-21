import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Typography, Link } from "@mui/material";
import { useLogin } from "../../../hooks/useLogin";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import FormInput from "../../../components/common/FormInput";
import PasswordInput from "../../../components/common/PasswordInput";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { control, handleSubmit } = useForm<LoginFormInputs>();
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = (userData) => {
    setErrorMessage(null);
    login(userData, {
      onSuccess: ({ user }) => {
        if (user?.name) {
          alert(`${user.name}님 환영합니다.`);
        }
        navigate("/app/main");
      },
      onError: (error: any) => {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("로그인 중 오류가 발생했습니다.");
        }
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: 5,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h1" mb={2} textAlign="center">
          로그인
        </Typography>

        {errorMessage && (
          <Typography color="error" mb={2} textAlign="center">
            {errorMessage}
          </Typography>
        )}

        <FormInput
          name="email"
          control={control}
          label="이메일"
          rules={{
            required: "이메일을 입력해주세요.",
          }}
        />
        <PasswordInput
          name="password"
          control={control}
          label="비밀번호"
          rules={{
            required: "비밀번호를 입력해주세요.",
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          fullWidth
        >
          로그인
        </Button>

        <Typography variant="body2" mt={2} textAlign="center">
          아직 계정이 없으세요?{" "}
          <Link component={RouterLink} to="/signup" underline="hover">
            회원가입 하기
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
