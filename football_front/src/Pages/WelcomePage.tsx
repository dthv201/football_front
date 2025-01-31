import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LoginIcon from "@mui/icons-material/Login";
import Layout from "../components/page_tamplate/Layout";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Welcome to Soccer Match Finder">
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          
          {/* Left Content */}
          <Grid item xs={12} md={6} sx={{ textAlign: "center", padding: "2rem" }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#333" }}>
              Find Your Next Soccer Match!
            </Typography>
            <Typography variant="body1" sx={{ color: "#4D4D4D", mt: 2 }}>
              Connect with fellow players, join local games, and build teams effortlessly. Join our community and start playing today!
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<EditIcon />}
                sx={{
                  backgroundColor: "#66A55E",
                  color: "white",
                  px: 4, py: 1.5,
                  "&:hover": { backgroundColor: "#5C9A55" },
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>

              <Button
                variant="contained"
                size="large"
                startIcon={<LoginIcon />}
                sx={{
                  backgroundColor: "#4DB6E5",
                  color: "white",
                  px: 4, py: 1.5,
                  "&:hover": { backgroundColor: "#3EA3D3" },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src="/src/assets/soccer-banner.png"  
              alt="Soccer Game"
              sx={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Grid>

        </Grid>
      </Container>
    </Layout>
  );
};

export default WelcomePage;
