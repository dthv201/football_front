import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Box,
  Divider,
  CardMedia,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';
import { Post } from "../../types/Post";
import { format } from "date-fns";
import { deletePost, getUserPosts, handleLike } from "../../services/postService";
import { toast } from "react-toastify";




const UserPosts: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const formatPostDate = (date: Date) => {
      return format(new Date(date), "dd/MM/yyyy HH:mm");
    };
    
    const fetchPosts = useCallback(async () => {
      try {
        setIsLoading(true);
        const userPosts = await getUserPosts(user?._id);
        setPosts(userPosts);
      } catch(error) {
        toast.error(`Failed to load posts: ${error}`);
      } finally {
        setIsLoading(false);
      }
    }, [setIsLoading, setPosts, user?._id]);

    const handleEditClick = (post: Post) => {
      navigate(`/post/update/${post._id}`, { state: { post } });
    };
    

    const onDeleteButtonClick = useCallback(async (postId: string) => {
      try {
        await deletePost(postId);
        toast.success("Post deleted successfully");
        await fetchPosts();
      } catch (error) {
        toast.error(`Failed to load posts: ${error}`);
      }
    }, [fetchPosts]);

    const handleLikeButton = useCallback(async (postId: string) => {
      if (user) {
        try {
          await handleLike(postId);
          await fetchPosts();
        } catch (error) {

          console.error(`We couldn't handle your like in the post, error`, error);

        }
      }
    }, [fetchPosts, user]);

    useEffect(() => {
        fetchPosts();
    }, [user, fetchPosts]);

  return (
    isLoading ? ( <CircularProgress /> ) :
    <Grid container spacing={3}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Grid size={12} key={post._id}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <CardHeader
                title={post.title}
                subheader={
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <CalendarMonthIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
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
                  sx={{ objectFit: 'cover' }}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" ml={0.5}>
                    {post.location}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.primary" paragraph>
                  {post.content}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <PersonIcon fontSize="small" color="primary" />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    Owner: {user?.username}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

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
              
              <CardActions sx={{ display: "flex", justifyContent: "flex-end", p: 2, pt: 0 }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleEditClick(post)}>
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => { if (post?._id) onDeleteButtonClick(post._id); }}>
                  Delete
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/game-info/${post._id}`)}
                  >
                    Game Details
                  </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid size={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No posts found
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default UserPosts;