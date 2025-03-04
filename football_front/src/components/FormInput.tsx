import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";

interface FormInputProps {
  name: string;
  control: Control<T>;
  label: string;
  icon?: React.ReactNode;
  type?: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, control, label, icon, type = "text", error }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
          }}
        />
      )}
    />
  );
};

export default FormInput;
