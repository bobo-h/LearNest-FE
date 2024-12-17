import React from 'react';
import BaseInput from './BaseInput';
import { FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  error?: FieldError;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = 'text', ...rest }, ref) => (
    <BaseInput label={label} error={error} type={type} ref={ref} {...rest} />
  ),
);

export default FormInput;
