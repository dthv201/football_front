import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Box,
  Chip,
  Avatar,
  Divider,
  CardMedia,
  CardHeader,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';
import { Post } from "../../types/Post";
import { format } from "date-fns";

interface UserPostsProps {
  posts: Post[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
  
  // Function to format date
  const formatPostDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm"); // Format: Jan 1, 2021
  };

  const handleEditClick = (post: Post) => {
    navigate(`/post/update/${post}`, { state: { post } });
  };

  return (
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
                
                {post.participants && post.participants.length > 0 && (
                  <Box sx={{ mb: 1.5 }}>
                    <Typography variant="body2" fontWeight="medium" gutterBottom>
                      Participants:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {post.participants.map((participant) => (
                        <Chip
                          key={participant._id}
                          avatar={participant.profile_img ? 
                            <Avatar src={participant.profile_img} /> : 
                            <Avatar>{participant.username[0]}</Avatar>
                          }
                          label={participant.username}
                          size="small"
                          sx={{ mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbUpIcon fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {post.likes_number || 0}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CommentIcon fontSize="small" color="primary" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {post.comments_number || 0}
                    </Typography>
                  </Box>
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
                  onClick={() => navigate(`/edit-post/${post._id}`)}>
                  Delete
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