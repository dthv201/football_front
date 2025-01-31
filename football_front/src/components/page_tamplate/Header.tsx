import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFF6A3", color: "#333", boxShadow: "none" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          Soccer Connect
        </Typography>
        <SportsSoccerIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
