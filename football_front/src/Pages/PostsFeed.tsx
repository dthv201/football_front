// PostsFeed.tsx
import React, { useState, useCallback, useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import Layout from "../components/page_tamplate/Layout";
import {
  CircularProgress,
  Typography,
  Box
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Post } from "../types/Post";
import { getAllPosts} from "../services/postService";
import PostCard from "../components/posts/postCard"; 

const PostsFeed: React.FC = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserPosts = useCallback(async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);



  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);


  const filteredPosts = posts.filter(
    post => post.owner !== user?._id && new Date(post.date).getTime() >= Date.now()
  );

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
              <PostCard key={post._id} post={post} refreshPosts={fetchUserPosts} userId={user!._id} />
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
