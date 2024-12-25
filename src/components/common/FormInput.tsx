import React from "react";
import { TextField } from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  error?: FieldError;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type = "text",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!error}
          helperText={error?.message || ""}
          fullWidth
        />
      )}
    />
  );
};

export default FormInput;
