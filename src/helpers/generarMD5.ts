import { MD5 } from 'crypto-js';
import React from 'react';

const generarMD5 = () => {
    const stringGenerate = '';
    const generateHash = MD5(stringGenerate).toString();
    console.log(generateHash);
}

export default generarMD5;