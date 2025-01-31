import React from "react";
import { Box, Typography, Button, Grid, Container, AppBar, Toolbar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import EditIcon from "@mui/icons-material/Edit";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        background: "linear-gradient(to bottom, #E5A561, #FFF6A3,#FDFFF1)", // Light Yellow to Soft Orange
      }}
    >
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#FFF6A3", color: "#333", boxShadow: "none" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Welcome Page
          </Typography>
          <SportsSoccerIcon />
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", mt: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            
            {/* Left Content */}
            <Grid
              item xs={12} md={6}
              sx={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem", textAlign: "center" }}
            >
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
                    backgroundColor: "#66A55E", // Green
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
                    backgroundColor: "#4DB6E5", // Sky Blue
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
                src="https://media.newyorker.com/photos/5d27aae390165d0009b8502e/master/w_1920,c_limit/Moore-MensSoccer.jpg"
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
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, textAlign: "center", bgcolor: "#D9D9D9", color: "black", width: "100%" }}>
        <Typography variant="body2">© 2025 SoccerConnect</Typography>
        <Typography variant="body2">
          <a href="#" style={{ color: "black", textDecoration: "underline" }}>Privacy Policy</a> | 
          <a href="#" style={{ color: "black", textDecoration: "underline", marginLeft: "8px" }}>Terms of Service</a>
        </Typography>
      </Box>

    </Box>
  );
};

export default WelcomePage;
