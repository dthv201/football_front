import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/page_tamplate/Layout"; // Adjust if your Layout is elsewhere
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  Divider,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  UploadFile,
  AccessTime,
  LocationOn,
  Description,
  Article,
} from "@mui/icons-material";
import { useUserContext } from "../../contexts/UserContext"; // Adjust path if needed
import { axiosInstance } from "../../services/api-client";    // Adjust path if needed

interface PostFormData {
  title: string;
  location: string;
  date: string;
  time: string;
  content: string;
  // NO img here—because we’ll use local state for the file
}

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  // --- React Hook Form for text fields only ---
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>();

  // --- Local state for selected file ---
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // --- Local state for preview ---
  const [preview, setPreview] = useState<string | null>(null);

  // --- Loading state ---
  const [loading, setLoading] = useState(false);

  // -------------------- Handle file selection manually --------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = e.target.files[0];
    setSelectedFile(file);

    // Show local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // -------------------- Final form submission --------------------
  const onSubmit = async (data: PostFormData) => {
    if (!user) {
      alert("User not found. Please log in.");
      return;
    }

    setLoading(true);

    try {
 
      const dateTime = new Date(`${data.date}T${data.time}`).toISOString();

 
      let imageUrl: string | undefined;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

   
        const uploadRes = await axiosInstance.post<{ url: string }>(
          "/file",
          formData
        );
        imageUrl = uploadRes.data.url;
      }

 
      const postData = {
        title: data.title,
        location: data.location,
        content: data.content,
        date: dateTime,
        owner: user._id,
        img: imageUrl, 
      };


      const createRes = await axiosInstance.post("/posts", postData);
      if (createRes.status === 201) {
        alert("Post created successfully!");
        reset();     
        setSelectedFile(null);
        setPreview(null);
        navigate("/profile");
      } else {
        throw new Error(`Failed to create post. Status: ${createRes.status}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Create Post">
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <Typography variant="body2" color="text.secondary">
            Share your upcoming match or event
          </Typography>
        </Box>
        <Paper
          elevation={1}
          sx={{
            p: { xs: 3, sm: 4 },
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 2,
          }}
        >
     
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
          
              <Grid size={12}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                  >
                    <UploadFile fontSize="small" /> Image
                  </FormLabel>
                  <Box
                    onClick={() => document.getElementById("imgInput")?.click()}
                    sx={{
                      height: 220,
                      border: "2px dashed #e0e0e0",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "all 0.2s",
                      "&:hover": { borderColor: "#bdbdbd" },
                    }}
                  >
                    {preview ? (
                      <Box
                        component="img"
                        src={preview}
                        alt="Preview"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box textAlign="center" p={3}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: "#f5f5f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                            mx: "auto",
                          }}
                        >
                          <UploadFile sx={{ color: "#9e9e9e" }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Upload a match/event image
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          mt={0.5}
                        >
                          PNG/JPG/GIF up to 10MB
                        </Typography>
                      </Box>
                    )}

                    <input
                      id="imgInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </Box>
                </FormControl>
              </Grid>

              <Grid size={12}>
                <Divider />
              </Grid>

              {/* TITLE */}
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.title}>
                  <FormLabel
                    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                  >
                    <Article fontSize="small" /> Title
                  </FormLabel>
                  <TextField
                    placeholder="Enter a title"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    {...register("title", { required: "Title is required" })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </FormControl>
              </Grid>

             
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.location}>
                  <FormLabel
                    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                  >
                    <LocationOn fontSize="small" /> Location
                  </FormLabel>
                  <TextField
                    placeholder="Where will it be?"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    {...register("location", { required: "Location is required" })}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                </FormControl>
              </Grid>

         
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.date}>
                  <FormLabel
                    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                  >
                    <AccessTime fontSize="small" /> Date
                  </FormLabel>
                  <TextField
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    {...register("date", { required: "Date is required" })}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                </FormControl>
              </Grid>

          
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.time}>
                  <FormLabel
                    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                  >
                    <AccessTime fontSize="small" /> Time
                  </FormLabel>
                  <TextField
                    type="time"
                    fullWidth
                    variant="outlined"
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                    {...register("time", { required: "Time is required" })}
                    error={!!errors.time}
                    helperText={errors.time?.message}
                  />
                </FormControl>
              </Grid>

          
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.content}>
                  <FormLabel
                    sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                  >
                    <Description fontSize="small" /> Description
                  </FormLabel>
                  <TextField
                    placeholder="Describe the event"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    size="medium"
                    {...register("content", { required: "Description is required" })}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                  />
                </FormControl>
              </Grid>

       
              <Grid size={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    px: 5,
                    py: 1.5,
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#1565c0" },
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                      Processing...
                    </Box>
                  ) : (
                    "Create Post"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreatePost;
