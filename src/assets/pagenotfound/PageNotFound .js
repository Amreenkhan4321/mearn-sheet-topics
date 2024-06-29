import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import image from "../images/question-mark-face-png-11552242933bershpxne6.png";
const PageNotFound = () => {
  return (
    <Box className="page-not-found">
      <Box className="page-not-found-inner" component={Paper}>
        {/* <img className="page-not-found-image" src={image} /> */}
        <Typography className="page-not-found-text">Page Not Found</Typography>
      </Box>
    </Box>
  );
};

export default PageNotFound;
