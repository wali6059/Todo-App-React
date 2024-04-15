import React from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';

const CustomFormControlLabel = ({ tasks, handleChange }) => {
  return (
    tasks?.map((task, index) => (<FormControlLabel
      key={index}
      control={
        <Checkbox
          checked={!task.Active || false}
          onChange={(event) => handleChange(event, index)}
        />
      }
      label={
        <Typography
          component="span"
          sx={{
            textDecoration: task.Active ? 'none' : 'line-through',
            display: 'inline-block',
          }}
        >
          {task.title}
        </Typography>
      }
    />
    )
    )
  );
};

export default CustomFormControlLabel;
