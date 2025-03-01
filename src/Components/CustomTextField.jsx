import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, value, onChange }) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            variant="outlined"
            sx={{
                padding: '-10px',    
                width: '80%', 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'orange',
                  },
                  '&:hover fieldset': {
                    borderColor: 'orange',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'orange',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'black',
                },
              }} 
            
        />
    );
};

export default CustomTextField;