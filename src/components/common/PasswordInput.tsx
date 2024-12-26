import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Controller,
  Control,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

interface PasswordInputProps {
  name: string;
  control: Control<any>;
  label: string;
  rules?: RegisterOptions;
  error?: FieldError;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  control,
  label,
  rules,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={showPassword ? "text" : "password"}
          error={!!error}
          helperText={error?.message || ""}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{ marginBottom: "16px" }}
        />
      )}
    />
  );
};

export default PasswordInput;
