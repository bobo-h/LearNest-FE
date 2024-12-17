import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import FormInput from '../components/FormInput';
import PasswordInput from '../components/PasswordInput';

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
  const { mutate: login, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    login(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" mb={2}>
        로그인
      </Typography>

      <FormInput
        label="이메일"
        {...register('email', { required: '이메일을 입력해주세요.' })}
        error={errors.email}
      />

      <PasswordInput
        label="비밀번호"
        {...register('password', { required: '비밀번호를 입력해주세요.' })}
        error={errors.password}
      />

      <Button type="submit" variant="contained" disabled={isPending} fullWidth>
        로그인
      </Button>
    </Box>
  );
};

export default LoginPage;
