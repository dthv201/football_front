import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../page_tamplate/Layout";
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
  Article 
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { Post } from "../../types/Post";
import { PostFormData, LocationState } from "./index";

interface UpdatePostProps {
  post?: Post;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ post: initialPost  }) => {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as LocationState;
  const [post, setPost] = useState<Post | undefined>(initialPost || location.state?.post);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    setValue
  } = useForm<PostFormData>();

  useEffect(() => {
    if (post) {
      populateForm(post);
      if (post?.img) {
        setPreview(post.img);
      }
      return;
    }
  }, [post, setPost]);
  
  const populateForm = (postData: Post) => {
    const postDate = new Date(postData.date);
    const formattedDate = postDate.toISOString().split('T')[0];
    const formattedTime = postDate.toTimeString().slice(0, 5);
    
    setValue("title", postData.title);
    setValue("location", postData.location);
    setValue("date", formattedDate);
    setValue("time", formattedTime);
    setValue("content", postData.content);
    setValue("owner", postData.owner);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    setLoading(true);
    
    try {
      const dateTime = new Date(`${data.date}T${data.time}`);
      
      const postData = {
        title: data.title,
        location: data.location,
        content: data.content,
        date: dateTime.toISOString(),
        owner: user?._id,
        img: preview ? preview : undefined
      };
      
      const postId = post?._id;
      
      if (!postId) {
        throw new Error("Post ID not found");
      }
      
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      
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
            borderRadius: 2
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Image Upload */}
              <Grid size={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <UploadFile fontSize="small" /> Image
                  </FormLabel>
                  <Box 
                    onClick={() => document.getElementById("imgInput")?.click()}
                    sx={{ 
                      height: 220, 
                      border: '2px dashed #e0e0e0',
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#bdbdbd'
                      }
                    }}
                  >
                    {preview ? (
                      <Box 
                        component="img" 
                        src={preview} 
                        alt="Preview" 
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <Box textAlign="center" p={3}>
                        <Box 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%',
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mb: 1,
                            mx: 'auto'
                          }}
                        >
                          <UploadFile sx={{ color: '#9e9e9e' }} />
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
                      style={{ display: 'none' }}
                      {...register("img")}
                      onChange={handleImageChange}
                    />
                  </Box>
                </FormControl>
              </Grid>
              
              <Grid size={12}>
                <Divider />
              </Grid>
              
              {/* Title */}
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.title}>
                  <FormLabel sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Article fontSize="small" /> Title
                  </FormLabel>
                  <TextField
                    placeholder="Enter match title"
                    value={post?.title}
                    fullWidth
                    variant="outlined"
                    size="medium"
                    {...register("title", { required: "Title is required" })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </FormControl>
              </Grid>
              
              {/* Location */}
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.location}>
                  <FormLabel sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
              
              {/* Date and Time */}
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.date}>
                  <FormLabel sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
                  <FormLabel sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
              
              {/* Description */}
              <Grid size={12}>
                <FormControl fullWidth error={!!errors.content}>
                  <FormLabel sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
              
              {/* Submit Button */}
              <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    px: 5, 
                    py: 1.5, 
                    bgcolor: '#1976d2', 
                    '&:hover': { bgcolor: '#1565c0' } 
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Paper>
      </Container>
    </Layout>
  );
};

export default UpdatePost;