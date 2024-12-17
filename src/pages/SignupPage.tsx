import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { useSignup } from '../hooks/useSignup';
import FormInput from '../components/FormInput';
import PasswordInput from '../components/PasswordInput';

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const { mutate: signup, isPending } = useSignup();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    signup(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" mb={2}>
        회원가입
      </Typography>

      <FormInput
        label="이름"
        {...register('name', { required: '이름을 입력해주세요.' })}
        error={errors.name}
      />

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

      <FormInput
        label="생년월일"
        type="date"
        {...register('birthDate', { required: '생년월일을 입력해주세요.' })}
        error={errors.birthDate}
      />

      <Button type="submit" variant="contained" disabled={isPending} fullWidth>
        회원가입
      </Button>
    </Box>
  );
};

export default SignupPage;
