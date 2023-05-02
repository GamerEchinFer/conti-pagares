import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import loader5 from '../../assets/loader5.json'
import Lottie from "lottie-react";

export default function LoadingIcon() {
  return (
    <div>
      {/* <CircularProgress size={100} /> */}
      <Lottie 
        animationData={loader5} 
        loop={true}
        autoplay={true}
        height={100}
        width={100}
         />
    </div>
  );
}