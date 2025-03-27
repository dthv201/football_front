// PostCard.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Divider, CardMedia, CardHeader, IconButton, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Post } from "../../types/Post";
import { handleLike} from "../../services/postService";
import { getCommentsCount} from "../../services/commentsService";

interface PostCardProps {
  post: Post;
  refreshPosts: () => void;
  userId: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, refreshPosts, userId }) => {
  const navigate = useNavigate();
  const [commentsCount, setCommentsCount] = useState<number>(post.comments_number || 0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const count = await getCommentsCount(post._id!);
        setCommentsCount(count);
      } catch (error) {
        console.error("Error fetching comments count:", error);
      }
    };
    if (post._id) {
        fetchComments();
      }
  }, [post._id]);

  const formatPostDate = (date: Date) => format(new Date(date), "dd/MM/yyyy HH:mm");

  const handleLikeButton = async () => {
    try {
      await handleLike(post._id!, userId);
      refreshPosts();
    } catch (error) {
      console.error("We couldn't handle your like in the post, error", error);
    }
  };

  return (
    <Grid size={4}>
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
            <IconButton onClick={handleLikeButton}>
              <ThumbUpIcon fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {post.likes_number || 0}
              </Typography>
            </IconButton>
            <IconButton onClick={() => navigate(`/addComments/${post._id!}`)}>
              <CommentIcon fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {commentsCount}
              </Typography>
            </IconButton>
          </Box>
        </CardContent>
        <Box sx={{ textAlign: "center", pb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/game-info/${post._id}`)}>
            Game Details
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default PostCard;
