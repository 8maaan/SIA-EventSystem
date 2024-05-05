import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StaircaseEffect = ({ text }) => {
  const words = text.split(' ');

  return (
    <Box sx={{
      position: 'relative',
      height: `${words.length * 60}px`, // Enough height to accommodate all words
      overflow: 'visible', // Ensure all words are visible
      width: '100%',
      textAlign: 'right',
      paddingRight: '20px' // Add some padding
    }}>
      {words.map((word, index) => (
        <Typography
          key={index}
          component="span"
          sx={{
            position: 'absolute',
            left: `${index * 50}px`, // Increase left position for each word
            top: `${index * 50}px`, // Increase top position to stack words vertically
            fontSize: '1.5rem',
            fontFamily: 'Biome W01 Regular',
            fontWeight: 'bold',
            color: 'black',
            whiteSpace: 'nowrap' // Prevent words from breaking into multiple lines
          }}
        >
          {word}
        </Typography>
      ))}
    </Box>
  );
};

export default StaircaseEffect;

