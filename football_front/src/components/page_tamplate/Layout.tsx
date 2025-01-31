import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        background: "linear-gradient(to bottom, #E5A561, #FFF6A3, #FDFFF1)", // Light Yellow to Soft Orange
      }}
    >
      <Header />
      <Container sx={{ flexGrow: 1, mt: 3 }}>{children}</Container>
      <Footer />
    </Box>
  );
};

export default Layout;
