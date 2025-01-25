import React from "react";
import { TextField } from "@mui/material";
import {
  Controller,
  Control,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

interface FormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  rules?: RegisterOptions;
  error?: FieldError;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  type = "text",
  rules,
  onChange,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!error}
          helperText={error?.message || ""}
          fullWidth
          sx={{ marginBottom: "16px" }}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            field.onChange(e);
            if (onChange) {
              onChange(e);
            }
          }}
        />
      )}
    />
  );
};

export default FormInput;
