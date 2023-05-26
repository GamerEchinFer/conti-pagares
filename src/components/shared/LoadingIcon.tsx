import * as React from 'react';
import loader5 from '../../assets/loader5.json'
import Lottie from "lottie-react";

export default function LoadingIcon() {
  return (
    <div>
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