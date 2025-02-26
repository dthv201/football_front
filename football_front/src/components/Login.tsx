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
  Stack
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import Layout from "./page_tamplate/Layout";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

interface LoginData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  interface User {
    displayName: string;
    // Add other user properties if needed
  }
  
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in
  useEffect(() => {
    fetch("http://localhost:3000/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      });
  }, []);

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        setUser(result.user);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Google Login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
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

        <Box sx={{ p: 4, bgcolor: "white", borderRadius: 2, boxShadow: 3, width: "100%", maxWidth: 400, textAlign: "center" }}>
       <Typography variant="h4" align="center" sx={{ mt: 5, mb: 3, color: "black" }}>
          Login to find a game match!
        </Typography>
       

          {user ? (
            <Typography variant="h5" align="center">
              Welcome, {user.displayName}!
            </Typography>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>

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

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: "#4DB6E5", color: "white", "&:hover": { bgcolor: "#3EA3D3" } }}
                >
                  Login
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
          )}

        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPage;
