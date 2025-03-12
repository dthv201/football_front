import React from "react";
import { Container, Box, Avatar, Typography } from "@mui/material";
import Layout from "../components/page_tamplate/Layout";
import { useAuth } from "../contexts/AuthContext";
import { string } from "yup";
import apiClient from './apiClient';
const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography variant="h6" align="center">
            Please log in to view your profile.
          </Typography>
        </Box>
      </Container>
    );
  }

  const getImageUrl = (img: string): string => {
    console.log(img);
    
    if (img.startsWith("http")) {
      return img;
    }
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
    return `${baseUrl}${img}`;
  }

  return (
    <Layout title="Profile">
      <Container maxWidth="md">
        {/* User Details Section */}
        <Box display="flex" flexDirection="column" alignItems="center" my={4}>
          <Avatar src={getImageUrl(user.profile_img)} sx={{ width: 150, height: 150 }} />
          <Typography variant="h4" mt={2}>
            {user.username}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user.email}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Skill Level: {user.skillLevel}
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
