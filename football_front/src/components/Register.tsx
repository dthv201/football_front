import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  Stack,
  Avatar,
  IconButton
} from "@mui/material";
import { AccountCircle, Email, Lock, PhotoCamera } from "@mui/icons-material";
import Layout from "./page_tamplate/Layout";
const defaultAvatar = "/avatar.png";

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

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  skillLevel: string;
  img?: FileList;
}

const RegisterPage: React.FC = () => {
  const { control, handleSubmit, register, watch, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(defaultAvatar);

  const imgFiles = watch("img");

  useEffect(() => {
    if (imgFiles && imgFiles.length > 0) {
      const selectedFile = imgFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, [imgFiles]);

  const onSubmit = async (data: FormData) => {
    console.log("Registration Data:", { ...data, img: file });
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("skillLevel", data.skillLevel);
      if (file) {
        formData.append("img", file);
      }
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert("Registration successful. Please login to continue.");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://c767-109-186-93-14.ngrok-free.app/auth/google";
  };

  return (
    <Layout title="Register">
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 4, bgcolor: "white", borderRadius: 2, boxShadow: 3, marginBlockEnd: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              {/* Profile Picture Upload */}
              <Box display="flex" justifyContent="center" position="relative">
                <Avatar src={preview} sx={{ width: 200, height: 200 }} />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "white",
                    border: "1px solid gray",
                  }}
                  onClick={() => document.getElementById("imgInput")?.click()}
                >
                  <PhotoCamera />
                </IconButton>
              </Box>
              <Typography variant="subtitle1" align="center" sx={{ color: "black" }}>Upload Profile Picture</Typography>

              {/* Hidden File Input */}
              <input
                id="imgInput"
                type="file"
                accept="image/jpeg, image/png"
                {...register("img")}
                style={{ display: "none" }}
              />

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
                  defaultValue="Beginner"
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

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#4DB6E5", color: "white", "&:hover": { bgcolor: "#3EA3D3" } }}
              >
                Register
              </Button>

              {/* Google Login Button */}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleGoogleLogin}
                sx={{ bgcolor: "#DB4437", color: "white", "&:hover": { bgcolor: "#C1351D" } }}
              >
                Sign in with Google
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
