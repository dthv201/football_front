import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";

interface FormInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  icon?: React.ReactNode;
  type?: string;
  error?: string;
}

const FormInput = <T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  icon,
  type = "text",
  error,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={undefined}
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
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
};

export default FormInput;
