import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../contexts/UserContext";
import Layout from "../components/page_tamplate/Layout";
import {
  Card, CardContent, Typography, Box, Divider,
  CardMedia, CardHeader, CircularProgress, Button,
  IconButton
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { Post } from "../types/Post";
import { format } from "date-fns";
import { getAllPosts, handleLike } from "../services/postService";

const PostsFeed: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserPosts = useCallback(async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  const handleLikeButton = useCallback(async (postId: string) => {
    if (user) {
      try {
        await handleLike(postId);
        await fetchUserPosts();
      } catch (error) {
        console.error(`We couldn't handle your like in the post, error`, error);
      }
    }
}, [fetchUserPosts, user]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  const filteredPosts = posts.filter(post => post.owner !== user?._id && new Date(post.date).getTime() >= Date.now());

  const formatPostDate = (date: Date) => format(new Date(date), "dd/MM/yyyy HH:mm");

  return (
    <Layout title="Posts Feed">
      {loading ? ( 
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Grid container spacing={3} marginBottom={3}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Grid size={4} key={post._id}>
                <Card sx={{ 
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease-in-out",
                  '&:hover': {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  }
                }}>
                  <CardHeader
                    title={post.title}
                    subheader={
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <CalendarMonthIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatPostDate(post.date)}
                        </Typography>
                      </Box>
                    }
                  />
                  
                  {post.img && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={post.img}
                      alt={post.title}
                      sx={{ objectFit: "cover" }}
                    />
                  )}
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" ml={0.5}>
                        {post.location}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.primary" paragraph>
                      {post.content}
                    </Typography>
                    
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton onClick={() => handleLikeButton(post._id!)}>
                      <ThumbUpIcon fontSize="small" color="primary" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {post.likes_number || 0}
                      </Typography>
                    </IconButton>
                      <IconButton onClick={() => navigate(`/addComments/${post._id!}`)}>
                      <CommentIcon fontSize="small" color="primary" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {post.comments_number || 0}
                      </Typography>
                    </IconButton>
                    </Box>
                  </CardContent>

                  <Box sx={{ textAlign: "center", pb: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => navigate(`/game-info/${post._id}`)}
                    >
                      Game Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid size={12}>
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No posts found
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Layout>
  );
};

export default PostsFeed;
