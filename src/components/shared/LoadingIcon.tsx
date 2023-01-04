import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

export default function LoadingIcon() {
  return (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress size={100} />
    </Box>
  );
}