import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import loader5 from '../../assets/loader5.json'
import Lottie from "lottie-react";

export default function LoadingComponent() {
  return (
    <>
      <Box sx={{ display: 'flex' }} className="">
        {/* <CircularProgress /> */}
        <Lottie animationData={loader5} loop={true} />
      </Box>
    </>
  );
}