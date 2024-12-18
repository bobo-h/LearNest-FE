import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Typography, Link } from "@mui/material";
import { useLogin } from "../hooks/useLogin";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    setErrorMessage(null);
    login(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (error: any) => {
        setErrorMessage(error.message); // 서버의 에러 메시지를 화면에 표시
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: 3,
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
          label="이메일"
          {...register("email", { required: "이메일을 입력해주세요." })}
          error={errors.email}
        />

        <PasswordInput
          label="비밀번호"
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          error={errors.password}
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
