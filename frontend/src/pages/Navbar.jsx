import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Custom styled AppBar
const CustomAppBar = styled(AppBar)({
  backgroundColor: '#3b3b6b',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
});

// Custom styled Button
const LogoutButton = styled(Button)({
  backgroundColor: '#dc3545', // Bootstrap-like red color
  color: 'white',
  borderRadius: '4px',
  padding: '6px 16px',
  '&:hover': {
    backgroundColor: '#c82333',
  },
  minWidth: 'auto',
  textTransform: 'none',
});

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <CustomAppBar elevation={3} sx={{mb:10}}>
      <Toolbar sx={{ 
        px: { xs: 2, sm: 4 },
        minHeight: '64px !important',
        justifyContent: 'space-between' 

      }}>
        {/* Center - Welcome message */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 500,
            position: 'absolute',
            left: '15%',
            transform: 'translateX(-50%)',
            color: 'white',
          }}
          align="left"
        >
          Welcome User
        </Typography>

        {/* Right side - Logout button */}
        <Box sx={{ ml: 'auto' }}>
          <LogoutButton
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={() => {
            Cookies.remove('Login');
              localStorage.removeItem('authToken');
              navigate('/');
            }}
          >
            Logout
          </LogoutButton>
        </Box>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;