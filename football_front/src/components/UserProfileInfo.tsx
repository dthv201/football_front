import React from "react";
import {useNavigate} from 'react-router';
import {toast} from 'react-toastify';
import { Avatar, Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import {userLogout} from '../services/auth';
import User from "../types/User";

interface UserProfileInfoProps {
  user: User | null;
}

const UserProfileInfo: React.FC<UserProfileInfoProps> = ( {user} ) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await userLogout();
      navigate('/');

      toast.success('Logged out successfully');
    } catch (e) {
      toast.error('Error logging out');
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Avatar
        src="https://via.placeholder.com/120"
        sx={{ width: 120, height: 120, mb: 2 }}
      />
      <Box
        sx={{
          backgroundColor: "#B29F7E",
          p: 2,
          borderRadius: 2,
          textAlign: "center",
          color: "white",
          minWidth: "300px",
        }}
      >
        <Typography variant="h6">User Name: {user?.userName}</Typography>
        <Typography>Email: {user?.email}</Typography>
        <Typography>Skill Level: {user?.skillLevel}</Typography>
      </Box>

      {/* כפתורים */}
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="info"
          startIcon={<LogoutIcon />}
          sx={{ borderRadius: "20px" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<EditIcon />}
          sx={{ borderRadius: "20px" }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfileInfo;
