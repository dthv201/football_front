import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface BluePinkCircularProgressProps {
  size?: number;
  thickness?: number;
}

const BluePinkCircularProgress: React.FC<BluePinkCircularProgressProps> = ({
  size = 80,
  thickness = 4,
}) => {
  return (
    <>
      {/* Define the gradient in a hidden SVG */}
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="bluePinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="indeterminate"
          size={size}
          thickness={thickness}
          sx={{
            "& .MuiCircularProgress-circle": {
              stroke: "url(#bluePinkGradient)",
            },
          }}
        />
      </Box>
    </>
  );
};

export default BluePinkCircularProgress;
