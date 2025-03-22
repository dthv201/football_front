import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import BluePinkCircularProgress from "../components/CircularWait";

import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  Avatar,
  IconButton,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Layout from "../components/page_tamplate/Layout";
import { getImageUrl } from "../utils/getImageUrl";
import { updateUser } from "../services/userService";
import { useUserContext } from "../contexts/UserContext";

interface UpdateFormData {
  username: string;
  skillLevel: string;
  profile_img?: FileList;
}


const UpdateUserInfo: React.FC = () => {
  const { user } = useUserContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>(
    user?.profile_img ? getImageUrl(user.profile_img) : "/avatar.png"
  );

  const { register, handleSubmit, control, watch, reset } = useForm<UpdateFormData>({
    defaultValues: {
      username: user?.username || "",
      skillLevel: user?.skillLevel || "Beginner",
    },
  });

  const imgFiles = watch("profile_img");

  useEffect(() => {
    if (user) {
      // Update the form values when user data is available
      reset({
        username: user.username,
        skillLevel: user.skillLevel,
      });
      setPreview(user.profile_img ? getImageUrl(user.profile_img) : "/avatar.png");
    }
  }, [user, reset]);

  useEffect(() => {
    if (imgFiles && imgFiles.length > 0) {
      const selectedFile = imgFiles[0];
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, [imgFiles]);

  const onSubmit = async (data: UpdateFormData) => {
    setLoading(true);

    // Build FormData to support file upload
    const formData = new FormData();
    if(user?.username != data.username){
    formData.append("username", data.username);
  }
  if(user && user.skillLevel != data.skillLevel){
    formData.append("skillLevel", data.skillLevel);
  }
    if (data.profile_img && data.profile_img.length > 0 && user?.profile_img !== data.profile_img[0].name) {
      formData.append("profile_img", data.profile_img[0]);
    }

    if(user)
      await updateUser(user._id, formData); 
    alert("changes saved",);
    setLoading(false);
  };




  return (
    <Layout title="Update Profile">
      <Container maxWidth="sm">
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
             <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
             <BluePinkCircularProgress size={80} thickness={4} />
          </Box>
          </Box>
        ) : !user ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Typography variant="h6" align="center" color="textSecondary">
              Please log in to view your profile.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" alignItems="center" my={4}>
              <Avatar src={preview} sx={{ width: 150, height: 150 }} />
              <IconButton onClick={() => document.getElementById("imgInput")?.click()}>
                <PhotoCamera />
              </IconButton>
              <input
                id="imgInput"
                type="file"
                accept="image/jpeg, image/png"
                {...register("profile_img")}
                style={{ display: "none" }}
              />
              <Typography variant="subtitle1" color="textSecondary">
                User name: {user.username}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Email: {user.email}
              </Typography>
              <TextField
                {...register("username")}
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                placeholder={user.username}
              />
              <Controller
                name="skillLevel"
                control={control}
                defaultValue={user.skillLevel}
                render={({ field }) => (
                  <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Skill Level</FormLabel>
                    <RadioGroup row {...field} sx={{ color: "black" }}>
                      <FormControlLabel value="Beginner" control={<Radio />} label="Beginner" />
                      <FormControlLabel value="Intermediate" control={<Radio />} label="Intermediate" />
                      <FormControlLabel value="Advanced" control={<Radio />} label="Advanced" />
                    </RadioGroup>
                  </FormControl>
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#4DB6E5",
                  color: "white",
                  "&:hover": { bgcolor: "#3EA3D3" },
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Update Profile"}
              </Button>
            </Box>
          </form>
        )}
      </Container>
    </Layout>
  );
  }



export default UpdateUserInfo;
