import {useState} from 'react';
import { Popover,Button,Typography } from '@mui/material';

export default () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    

    return(
        <div>
<Button aria-describedby={1} variant="contained" onClick={handleClick}>
        ?
      </Button>
      <Popover
        id={1}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>

        <h2>Anleitung: </h2>
        <p>Press ctrl + y to return to last state of Image</p>
        <p>Press z to return to recent state of Image</p>
        <p>press d to delete Canvas</p>
        <p>holding strg while pointing on main Canvas will pick Color you clicked on</p>

        </Typography>
      </Popover>
</div>

    )
}