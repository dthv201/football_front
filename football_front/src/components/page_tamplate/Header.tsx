import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();


  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Define the items you want to show in the menu
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Profile", path: "/profile" },
    { label: "feed", path: "/feed" },
    { label: "Update Info", path: "/update" },
    { label: "Create Game", path: "/post/create" },
    { label: "Update Post", path: "/post/update/:id" },
   

  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#FFF6A3", color: "#333", boxShadow: "none" }}
      >
        <Toolbar>
          {/* Menu button that opens the Drawer */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            {title}
          </Typography>

     
          <SportsSoccerIcon />
        </Toolbar>
      </AppBar>

      {/* The Drawer (slide-out menu) */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
