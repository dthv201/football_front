import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  title: string;  
}

const Layout: React.FC<LayoutProps> = ({ children , title}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        background: "linear-gradient(to bottom, #E5A561, #FFF6A3, #FDFFF1)", 
      }}
    >
      <Header title={title} />
      <Container sx={{ flexGrow: 1, mt: 3 }}>{children}</Container>
      <Footer />
    </Box>
  );
};

export default Layout;
