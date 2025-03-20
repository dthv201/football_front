import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileDetails from "../components/profile_details/ProfileDetails";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/auth";
import { getUserPosts } from "../services/postService";
import { Post } from "../types/Post";
import Layout from "../components/page_tamplate/Layout";
import { Container, Typography, Box, Button, CircularProgress, } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserPosts from "../components/posts/posts";

const ProfilePage: React.FC = () => {
    const authContext = useAuth();
    const { user, accessToken } = authContext;
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserPosts = useCallback(async () => {
        if (!accessToken || !user?._id) return;

        try {
            setLoading(true);
            const fetchedPosts = await getUserPosts(accessToken, user._id);
            setPosts(fetchedPosts);
        } catch (e) {
            toast.error("Failed to load posts");
        } finally {
            setLoading(false);
        }
    }, [accessToken, user?._id]);

    useEffect(() => {
        fetchUserPosts();
    }, [fetchUserPosts]);

    const handleLogout = async () => {
        try {
            await logout();
            authContext.logout();
            navigate("/");
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(`Error logging out: ${error}`);
        }
    };

    return (
        <Layout title="Profile">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Container maxWidth="md">
                            <Typography variant="h4" textAlign="center" gutterBottom>
                                My Profile
                            </Typography>
                            {user ? (
                                <ProfileDetails user={user} />
                            ) : (
                                <Typography variant="h6" textAlign="center">
                                    User not found
                                </Typography>
                            )}
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
                                <Button variant="contained" color="primary" onClick={() => navigate("/update")}>
                                    Edit Profile
                                </Button>
                                <Button variant="contained" color="secondary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Box>
                        </Container>
                    </Grid>
                    <Grid size={8}>
                        <Container>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                <Typography variant="h5">My Posts</Typography>
                                <Button variant="contained" color="primary" onClick={() => navigate("/post/create")}>
                                    + Create Post
                                </Button>
                            </Box>
                            {loading ? (
                                <CircularProgress />
                            ) : posts.length > 0 ? (
                                <UserPosts posts={posts} />)
                                :
                                (
                                    <Typography>No posts found</Typography>
                                )}
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default ProfilePage;
