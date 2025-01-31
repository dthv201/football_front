import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ py: 3, textAlign: "center", bgcolor: "#D9D9D9", color: "black", width: "100%" }}>
      <Typography variant="body2">© 2025 SoccerConnect</Typography>
      <Typography variant="body2">
        <a href="#" style={{ color: "black", textDecoration: "underline" }}>Privacy Policy</a> | 
        <a href="#" style={{ color: "black", textDecoration: "underline", marginLeft: "8px" }}>Terms of Service</a>
      </Typography>
    </Box>
  );
};

export default Footer;
