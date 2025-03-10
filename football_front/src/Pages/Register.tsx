import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Button,
  Container,
  Typography,
  FormControl,
  FormLabel,
  Stack,
  Avatar,
  IconButton,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AccountCircle, Email, Lock, PhotoCamera } from "@mui/icons-material";
import Layout from "../components/page_tamplate/Layout";
import { registerUser, googleSignin } from "../services/auth";
import { registerSchema } from "../validations/validationSchemas";
import FormInput from "../components/FormInput";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";


const defaultAvatar = "/avatar.png";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  skillLevel: string;
  img?: FileList;
}

const RegisterPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(defaultAvatar);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  

  const imgFiles = watch("img");

  useEffect(() => {
    if (imgFiles && imgFiles.length > 0) {
      const selectedFile = imgFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, [imgFiles]);

  const onSubmit = async (data: FormData) => {
    setLoadingRegister(true);
    console.log("Registration Data:", { ...data, img: file });
    try {
      const result = await registerUser(data, file || undefined);
      if (result.success) {
        if(result.data.accessToken && result.data.user){
          localStorage.setItem("token", result.data.accessToken);
          localStorage.setItem("refreshToken", result.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(result.data.user));
        alert("Registration successful. Please login to continue.");
        }
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
    setLoadingRegister(false);
  };
  

  const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
  setLoadingGoogle(true);
  console.log("Google response:", credentialResponse);
  try {
    const res = await googleSignin(credentialResponse);
    if(res.data.accessToken && res.data.user){
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Backend response:", res);
      alert("Registration successful.");
    }
    else {
      alert(`Error: ${res.message || "Google sign-in failed"}`);
    }
  
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    alert("Something went wrong with Google sign-in.");
  }
  setLoadingGoogle(false);
};

const onGoogleFailure = async () => {
  console.log("Google login failed.");
  setLoadingGoogle(false);
};

  return (
    <Layout title="Register">
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 5,
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
            marginBlockEnd: 5,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
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
              <Typography variant="subtitle1" align="center" sx={{ color: "black" }}>
                Upload Profile Picture
              </Typography>

              <input
                id="imgInput"
                type="file"
                accept="image/jpeg, image/png"
                {...register("img")}
                style={{ display: "none" }}
              />

              <FormInput
                name="username"
                control={control}
                label="Username"
                icon={<AccountCircle />}
                error={errors.username?.message}
              />
              <FormInput
                name="email"
                control={control}
                label="Email"
                icon={<Email />}
                error={errors.email?.message}
              />
              <FormInput
                name="password"
                control={control}
                label="Password"
                type="password"
                icon={<Lock />}
                error={errors.password?.message}
              />
              <FormInput
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                type="password"
                icon={<Lock />}
                error={errors.confirmPassword?.message}
              />

              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: "black" }}>
                  Skill Level
                </FormLabel>
                <RadioGroup defaultValue="Beginner" row {...register("skillLevel")} sx={{ color: "black" }}>
                  <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                  <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                  <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                </RadioGroup>
              </FormControl>

              <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                {loadingGoogle ? (
                  <Button
                    variant="contained"
                    fullWidth
                    disabled
                    sx={{ bgcolor: "#4DB6E5", color: "white" }}
                  >
                    <CircularProgress size={24} color="inherit" />
                  </Button>
                ) : (
                  <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleFailure} />
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  flex: 1,
                  bgcolor: "#4DB6E5",
                  color: "white",
                  "&:hover": { bgcolor: "#3EA3D3" },
                }}
                disabled={loadingRegister}
              >
                {loadingRegister ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </Button>

              </Box>

              
            </Stack>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
