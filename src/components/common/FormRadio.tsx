import React from "react";
import { Controller, Control } from "react-hook-form";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface FormRadioProps {
  name: string;
  control: Control<any>;
  options: { value: boolean; label: string }[];
}

const FormRadio: React.FC<FormRadioProps> = ({ name, control, options }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup {...field}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value.toString()}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default FormRadio;
