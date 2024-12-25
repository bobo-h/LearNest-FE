import React from "react";
import { Controller, Control } from "react-hook-form";
import { Box, Typography } from "@mui/material";

interface FileInputProps {
  name: string;
  control: Control<any>;
  label: string;
  accept?: string; // 파일 형식 제한 (e.g., "image/*", ".pdf")
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  control,
  label,
  accept,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ marginTop: "8px" }}>
          <Typography variant="subtitle2" sx={{ marginBottom: "8px" }}>
            {label}
          </Typography>
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              field.onChange(file);
            }}
          />
          {error && (
            <Typography variant="caption" color="error">
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default FileInput;
