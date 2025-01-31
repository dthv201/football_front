//RegPage
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
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
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 4, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Register
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              
              {/* Username Field */}
              <Grid item xs={12}>
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
              </Grid>

              {/* Email Field */}
              <Grid item xs={12}>
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
              </Grid>

              {/* Password Field */}
              <Grid item xs={12}>
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
              </Grid>

              {/* Confirm Password Field */}
              <Grid item xs={12}>
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
              </Grid>

              {/* Skill Level Selection */}
              <Grid item xs={12}>
                <FormLabel component="legend">Skill Level</FormLabel>
                <Controller
                  name="skillLevel"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                      <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                      <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                    </RadioGroup>
                  )}
                />
                {errors.skillLevel && (
                  <Typography color="error" variant="body2">
                    {errors.skillLevel.message}
                  </Typography>
                )}
              </Grid>

              {/* Profile Picture Upload */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Upload Profile Picture</Typography>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "2px dashed gray",
                    padding: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: "#f9f9f9",
                    "&:hover": { bgcolor: "#f1f1f1" },
                  }}
                >
                  <input {...getInputProps()} />
                  {profilePic ? (
                    <Typography variant="body2">{profilePic.name}</Typography>
                  ) : (
                    <Typography variant="body2">
                      Drag & drop an image here, or click to select one
                    </Typography>
                  )}
                  <PhotoCamera fontSize="large" />
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: "#4DB6E5", color: "white", "&:hover": { bgcolor: "#3EA3D3" } }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
