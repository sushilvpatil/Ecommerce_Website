import React from 'react';
import { Button } from '@mui/material';
const CustomButton = ({ text,onClick }) => {
    return (
        <Button  variant="outlined" 
          sx={{width:'80%', borderColor: 'orange', color: 'orange',  '&:hover': { borderColor: 'orange', backgroundColor: 'orange',color: 'white' } }}
         onClick={onClick}>{text}</Button>
    );
};

export default CustomButton;