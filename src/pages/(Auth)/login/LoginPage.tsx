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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    setErrorMessage(null);
    login(data, {
      onSuccess: () => navigate("/dashboard"),
      onError: (error: any) => setErrorMessage(error.message),
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
