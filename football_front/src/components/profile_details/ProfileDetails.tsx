import React, { useEffect } from "react";
import { Container, Box, Avatar, Typography } from "@mui/material";
import { getImageUrl } from "../../utils/getImageUrl";
import { useUserContext } from "../../contexts/UserContext";


const ProfileDetails: React.FC = () => {
    const { user } = useUserContext();
    useEffect(() => {
      if (user) {
        getImageUrl(user.profile_img);
}
}, [user]);

      
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

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Avatar src={getImageUrl(user.profile_img)} sx={{ width: 120, height: 120 }} />
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
  );
};

export default ProfileDetails;
