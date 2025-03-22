import React, { useState } from "react";
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
  Stack,
  CircularProgress,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import Layout from "../components/page_tamplate/Layout";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import { googleSignin, userLogin } from "../services/auth";
 import { useUserContext } from "../contexts/UserContext";
import { LoginData } from "../types/User";
import { useNavigate } from "react-router-dom";

// Validation schema remains the same
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const {user, setUser} = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Google response:", credentialResponse);
    try {
      setLoading(true);
      const res = await googleSignin(credentialResponse);
      console.log("Backend response:", res);
      setAuthInfo(
        { ...res.user, skillLevel: res.user.skillLevel || "Beginner" },
        res.accessToken,
        res.refreshToken
      );
      navigate("/profile");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Something went wrong with Google sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleFailure = async () => {
    console.log("Google login failed.");
  };

  const onSubmit = async (data: LoginData) => {
    
    try {
      setLoading(true);
      const user = await userLogin(data);
      setUser(user);
      console.log("Login response:", user);
      navigate("/profile"); 
    } catch  {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
      
    }
  };

  return (
    <Layout title="Login">
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          {user ? (
            <Typography
              variant="h5"
              align="center"
              sx={{ mt: 5, mb: 3, color: "black" }}
            >
              Welcome, {user.username}!
            </Typography>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ mt: 5, mb: 3, color: "black" }}
                >
                  Login to find a game match!
                </Typography>

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

                {/* Login and Google Login Buttons */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <GoogleLogin
                    onSuccess={onGoogleSuccess}
                    onError={onGoogleFailure}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#4DB6E5",
                      color: "white",
                      "&:hover": { bgcolor: "#3EA3D3" },
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Box>
              </Stack>
            </form>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPage;
