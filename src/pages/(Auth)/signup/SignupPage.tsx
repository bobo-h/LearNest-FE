import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Typography, Link } from "@mui/material";
import { useSignup } from "../../../hooks/useSignup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import FormInput from "../../../components/common/FormInput";
import PasswordInput from "../../../components/common/PasswordInput";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthDate: string;
}

const SignupPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: signup, isPending } = useSignup();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    const { password, name, email, birthDate } = data;
    setErrorMessage(null);
    signup(
      { password, name, email, birthDate },
      {
        onSuccess: () => navigate("/dashboard"),
        onError: (error: any) => setErrorMessage(error.message),
      }
    );
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
          회원가입
        </Typography>

        {errorMessage && (
          <Typography color="error" mb={2} textAlign="center">
            {errorMessage}
          </Typography>
        )}

        <FormInput name="name" control={control} label="이름" />
        <FormInput name="email" control={control} label="이메일" />
        <PasswordInput name="password" control={control} label="비밀번호" />
        <PasswordInput
          name="passwordConfirm"
          control={control}
          label="비밀번호 확인"
          rules={{
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value: string) =>
              value === getValues("password") ||
              "비밀번호가 일치하지 않습니다.",
          }}
          error={errors.passwordConfirm}
        />
        <FormInput
          name="birthDate"
          control={control}
          label="생년월일"
          type="date"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          fullWidth
        >
          회원가입
        </Button>

        <Typography variant="body2" mt={2} textAlign="center">
          이미 계정이 있으세요?{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            로그인 하기
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
