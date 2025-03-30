import React, { useEffect, useState } from "react";
import Layout from "../components/page_tamplate/Layout";
import { useParams } from "react-router-dom";
import BluePinkCircularProgress from "../components/CircularWait";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import { Comment, createComment, getPostComments } from "../services/commentsService";


const PostsComments: React.FC = () => {
  const { user } = useUserContext();
  const { postId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddComment = async () => {
    setLoading(true);
    if (!newComment.trim()) return;

    const commentData = {
      comment: newComment,
      postId: postId,
      owner: user?.username,
    };

    try {
      const comment = await createComment(commentData);
      console.log("Comment created successfully");
      setComments((prev) => [...prev, comment]);
    } catch (error) {
      console.error("Error creating comment:", error);
      alert("Failed to create comment. Please try again.");
    }

    setNewComment("");
    setLoading(false);
  };

  useEffect(() => {
    getPostComments(postId!)
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setLoading(false);
      });
  }, [postId, user?.accessToken]);

  return (
    <Layout title="Comments">
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 2, minHeight: "300px" }}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="300px"
            >
              <BluePinkCircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                Comments
              </Typography>
              <Box sx={{ mb: 2 }}>
                {comments.map((comment, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {comment.owner}
                    </Typography>
                    <Typography variant="body1">
                      {comment.comment}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
              </Box>
              <Box mt={2}>
                <TextField
                  label="Add a comment"
                  multiline
                  rows={3}
                  fullWidth
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                  sx={{ mt: 1 }}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default PostsComments;
