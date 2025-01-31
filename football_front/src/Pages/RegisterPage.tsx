import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Stack
} from "@mui/material";
import { AccountCircle, Email, Lock, PhotoCamera } from "@mui/icons-material";
import Layout from "../components/page_tamplate/Layout";

// Validation Schema using Yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
  skillLevel: yup.string().required("Please select a skill level"),
});

const RegisterPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);

  // Handle file upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setProfilePic(acceptedFiles[0]);
    },
  });

  interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    skillLevel: string;
  }

  const onSubmit = (data: FormData) => {
    console.log("Registration Data:", { ...data, profilePic });
    // Here you can call an API to register the user
  };

  return (
    <Layout title="Register">
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 4, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom sx={{ color: "black" }}>
            Register
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              
              {/* Username Field */}
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    sx={{ color: "black" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ color: "black" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ color: "black" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Confirm Password Field */}
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    sx={{ color: "black" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Skill Level Selection */}
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: "black" }}>Skill Level</FormLabel>
                <Controller
                  name="skillLevel"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup {...field} row sx={{ color: "black" }}>
                      <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" sx={{ color: "black" }} />
                      <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" sx={{ color: "black" }} />
                      <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" sx={{ color: "black" }} />
                    </RadioGroup>
                  )}
                />
                {errors.skillLevel && (
                  <Typography color="error" variant="body2">
                    {errors.skillLevel.message}
                  </Typography>
                )}
              </FormControl>

              {/* Profile Picture Upload */}
              <Typography variant="subtitle1" sx={{ color: "black" }}>Upload Profile Picture</Typography>
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed gray",
                  padding: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  bgcolor: "#f9f9f9",
                  "&:hover": { bgcolor: "#f1f1f1" },
                  color: "black"
                }}
              >
                <input {...getInputProps()} />
                {profilePic ? (
                  <Typography variant="body2" sx={{ color: "black" }}>{profilePic.name}</Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: "black" }}>
                    Drag & drop an image here, or click to select one
                  </Typography>
                )}
                <PhotoCamera fontSize="large" />
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#4DB6E5", color: "white", "&:hover": { bgcolor: "#3EA3D3" } }}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
