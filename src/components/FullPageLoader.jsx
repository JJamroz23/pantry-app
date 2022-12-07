import { Box, CircularProgress } from "@mui/material";
import React from "react";

const FullPageLoader = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};

export default FullPageLoader;
