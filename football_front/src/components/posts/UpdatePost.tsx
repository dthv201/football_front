// FILE: src/components/posts/UpdatePost.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/page_tamplate/Layout"; // Adjust if needed
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
import { Post, PostFormData } from "../../types/Post";
import { updatePost } from "../../services/postService";
import { axiosInstance } from "../../services/api-client";

const UpdatePost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Post ID from URL
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PostFormData>();

  // Helper: fetch post by ID using axiosInstance (JWT automatically attached)
  const fetchPostById = async (postId: string): Promise<Post> => {
    const response = await axiosInstance.get<Post>(`/posts/${postId}`);
    return response.data;
  };

  // Fetch the post if not already loaded
  useEffect(() => {
    if (!post && id) {
      console.log("Fetching post by id:", id);
      fetchPostById(id)
        .then((fetchedPost) => {
          console.log("Fetched post:", fetchedPost);
          setPost(fetchedPost);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          alert("Failed to load post.");
          navigate("/profile");
        });
    }
  }, [id, post, navigate]);

  // Once post is available, populate the form fields.
  useEffect(() => {
    if (post) {
      const postDate = new Date(post.date);
      const formattedDate = postDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
      const formattedTime = postDate.toTimeString().slice(0, 5);   // "HH:MM"
      reset({
        title: post.title,
        location: post.location,
        content: post.content,
        owner: post.owner,
        date: formattedDate,
        time: formattedTime,
      });
      if (post.img) {
        console.log("Setting preview from post.img:", post.img);
        setPreview(post.img);
      }
    }
  }, [post, reset]);

  // Handle file selection (use local state, not React Hook Form)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleImageChange fired");
    if (!e.target.files || e.target.files.length === 0) {
      console.log("No file selected");
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = e.target.files[0];
    console.log("User selected file:", file.name);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("FileReader finished, setting preview");
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Final submission: update the post
  const onSubmit = async (data: PostFormData) => {
    console.log("=== onSubmit called ===");
    console.log("RHF data:", data);
    setLoading(true);
    try {
      if (!post?._id) {
        throw new Error("Post ID not found");
      }
      const dateTime = new Date(`${data.date}T${data.time}`);
      console.log("Combined dateTime as Date object:", dateTime);

      // Build updated post
      const editedPost: Post = {
        _id: post._id,
        title: data.title,
        location: data.location,
        content: data.content,
        owner: data.owner,
        date: dateTime,
      };

      // If a new file is selected, upload it and attach the URL
      if (selectedFile) {
        console.log("Uploading new file...");
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch("http://localhost:3000/file", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("File upload failed");
        }
        const result = await response.json();
        console.log("File upload result:", result);
        editedPost.img = result.url;
      } else {
        console.log("No new file selected; keeping existing image.");
        editedPost.img = post.img;
      }

      console.log("Final edited post to send:", editedPost);
      await updatePost(post._id, editedPost);
      console.log("Post updated successfully");
      alert("Post updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Update Post">
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <Typography variant="body2" color="text.secondary">
            Edit your match post
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
          { !post ? (
            <Box textAlign="center" p={4}>
              <Typography variant="h6" color="text.secondary">
                Loading post data...
              </Typography>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {/* IMAGE UPLOAD */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <UploadFile fontSize="small" /> Image
                    </FormLabel>
                    <Box
                      onClick={() => {
                        console.log("Clicked to open file dialog");
                        document.getElementById("imgInput")?.click();
                      }}
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
                          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                            Upload a match-related image
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                            PNG, JPG, GIF up to 10MB
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

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* TITLE */}
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.title}>
                    <FormLabel sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Article fontSize="small" /> Title
                    </FormLabel>
                    <TextField
                      placeholder="Enter match title"
                      fullWidth
                      variant="outlined"
                      size="medium"
                      {...register("title", { required: "Title is required" })}
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  </FormControl>
                </Grid>

                {/* LOCATION */}
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.location}>
                    <FormLabel sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <LocationOn fontSize="small" /> Location
                    </FormLabel>
                    <TextField
                      placeholder="Where will the match take place?"
                      fullWidth
                      variant="outlined"
                      size="medium"
                      {...register("location", { required: "Location is required" })}
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  </FormControl>
                </Grid>

                {/* DATE */}
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.date}>
                    <FormLabel sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
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

                {/* TIME */}
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.time}>
                    <FormLabel sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
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

                {/* DESCRIPTION */}
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.content}>
                    <FormLabel sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Description fontSize="small" /> Description
                    </FormLabel>
                    <TextField
                      placeholder="Describe the match (rules, teams, etc.)"
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      size="medium"
                      {...register("content", { required: "Description is required" })}
                      error={!!errors.content}
                      helperText={errors.content?.message || "Provide details about the match"}
                    />
                  </FormControl>
                </Grid>

                {/* SUBMIT BUTTON */}
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ px: 5, py: 1.5, bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" } }}
                  >
                    {loading ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                        Processing...
                      </Box>
                    ) : (
                      "Update Post"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default UpdatePost;
