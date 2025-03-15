import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Post } from "../../types/Post";

interface UserPostsProps {
  posts: Post[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  return (
    <Grid container spacing={2}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Grid key={post._id}>
            <Card sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
              <CardContent>
                {post.img && (
                  <img
                    src={post.img}
                    alt={post.title}
                    style={{ width: "100%", borderRadius: "5px", marginBottom: "10px" }}
                  />
                )}
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.content}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Type: {post.type}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Category: {post.filed}
                </Typography>
                <Typography variant="body2">
                  Owner: {post.owner}
                </Typography>
                <Typography variant="body2">
                  {/* Participants: {post.participants.map(p => p.username).join(", ")} */}
                  Participants:
                </Typography>
                <Typography variant="body2">
                  Likes: {post.likes_number} | Comments: {post.comments_number}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" textAlign="center" sx={{ width: "100%", marginTop: 2 }}>
          No posts found
        </Typography>
      )}
    </Grid>
  );
};

export default UserPosts;
