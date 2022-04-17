import React from 'react';
import Box from '@material-ui/core/Box';
import { Rating } from '@mui/material';



export default function RenderStarRating() {
  return (
    <div>
      <Box align="left" mb={1} borderColor="transparent">
        <Rating
          value='3.5'
          name="rating"
          readOnly="true"
        />
      </Box>
    </div>
  )
}