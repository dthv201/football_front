import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Layout from "../components/page_tamplate/Layout";
import UserProfileInfo from "../components/UserProfileInfo";
import User from "../types/User";

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
  return (
<Layout title="Profile">
      <Container maxWidth="md">
        <Typography variant="h6" align="center" fontWeight="bold">
          Your personal information
        </Typography>
        <UserProfileInfo user={user} />

        {/* My Posts Section */}
        <Typography
          variant="h5"
          sx={{ mt: 4, mb: 2, textAlign: "center", fontWeight: "bold" }}
        >
          My Posts
        </Typography>

        {/* Cards Section */}
        <Grid container spacing={2} justifyContent="center">
          {[1, 2, 3, 4].map((post) => (
            <Grid item xs={12} sm={6} md={3} key={post}>
              <Card sx={{ maxWidth: 280 }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle1">User Name</Typography>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    location
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: 120,
                      backgroundColor: "#e0e0e0",
                      mt: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      📷
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Date and time
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    participants
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    context
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                  <Button size="small" color="error" variant="contained">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </Layout>
  );
};

export default Profile;
