import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileDetails from "../components/profile_details/ProfileDetails";
import { useUserContext } from "../contexts/UserContext";
import { userLogout } from "../services/auth";
import Layout from "../components/page_tamplate/Layout";
import { Container, Typography, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserPosts from "../components/posts/posts";
import BluePinkCircularProgress from "../components/CircularWait";

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();

    const handleLogout = async () => {
        try {
            await userLogout();
            setUser(null); // Assuming you have a setUser function in your context to clear user data
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
                                <ProfileDetails />
                            ) : (
                                <BluePinkCircularProgress />
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
                            <UserPosts />
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default ProfilePage;
