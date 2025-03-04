import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Typography,
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
import Layout from "../components/page_tamplate/Layout";
import {registerUser} from "../services/auth";
import { registerSchema } from "../validations/validationSchemas";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FormInput from "../components/FormInput";
import { googleSignin } from "../services/auth";

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
  const { control, handleSubmit, register, watch, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
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

    const result = await registerUser(data, file || undefined);
    if (result.success) {
      alert("Registration successful. Please login to continue.");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Google response:", credentialResponse);
    try {
      const res = await googleSignin(credentialResponse);
      console.log("Backend response:", res);
      alert("Registration successful.");
      // Optionally handle tokens or navigation based on response
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Something went wrong with Google sign-in.");
    }
  };
  
  const onGoogleFailure = async () => {
    console.log("Google login failed.");
  };
  
return (
  <Layout title="Register">
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, bgcolor: "white", borderRadius: 2, boxShadow: 3, marginBlockEnd: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="center" position="relative">
              <Avatar src={preview} sx={{ width: 200, height: 200 }} />
              <IconButton
                sx={{ position: "absolute", bottom: 0, right: 0, bgcolor: "white", border: "1px solid gray" }}
                onClick={() => document.getElementById("imgInput")?.click()}
              >
                <PhotoCamera />
              </IconButton>
            </Box>
            <Typography variant="subtitle1" align="center" sx={{ color: "black" }}>Upload Profile Picture</Typography>

            <input id="imgInput" type="file" accept="image/jpeg, image/png" {...register("img")} style={{ display: "none" }} />

            <FormInput name="username" control={control} label="Username" icon={<AccountCircle />} error={errors.username?.message} />
            <FormInput name="email" control={control} label="Email" icon={<Email />} error={errors.email?.message} />
            <FormInput name="password" control={control} label="Password" type="password" icon={<Lock />} error={errors.password?.message} />
            <FormInput name="confirmPassword" control={control} label="Confirm Password" type="password" icon={<Lock />} error={errors.confirmPassword?.message} />

            <FormControl component="fieldset" >
              <FormLabel component="legend" sx={{ color: "black" }}>Skill Level</FormLabel>
              <RadioGroup defaultValue="Beginner" row {...register("skillLevel")} sx={{ color: "black" }}>
                <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: "flex", gap: 2 }}>
            <GoogleLogin  onSuccess={onGoogleSuccess} onError={onGoogleFailure}/>

            <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#4DB6E5", color: "white", "&:hover": { bgcolor: "#3EA3D3" } }}>
              Register
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
