import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingComponent = () => {

  return (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
      <Box>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default LoadingComponent;