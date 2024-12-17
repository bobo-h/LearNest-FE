import React from 'react';
import { TextField } from '@mui/material';
import { FieldError } from 'react-hook-form';

interface BaseInputProps {
  label: string;
  error?: FieldError;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  inputProps?: Record<string, any>;
}

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, type = 'text', inputProps, ...rest }, ref) => (
    <TextField
      label={label}
      error={!!error}
      type={type}
      helperText={error?.message || ''}
      inputRef={ref}
      slotProps={{ input: { ...inputProps } }}
      {...rest}
    />
  ),
);

export default BaseInput;
