import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/login.webp';
import Cookies from 'js-cookie';

const Login = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (Cookies.get('Login')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Validate Mobile Number
  const validateMobileNo = (mobileNo) => {
    return /^[0-9]{10}$/.test(mobileNo);
  };

  // Validate Password
  const validatePassword = (password) => {
    return password.length >= 6; // Password should be at least 6 characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMobileNo(mobileNo)) {
      setSnackbarMessage('Please enter a valid 10-digit mobile number');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!validatePassword(password)) {
      setSnackbarMessage('Password must be at least 6 characters long');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNo,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the token and cookies
        localStorage.setItem('authToken', result.token);
        Cookies.set('Login', 'true', { expires: 7 });

        setSnackbarMessage(result.message || 'Login successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        // Navigate after delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        // Handle error response
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      setSnackbarMessage(error.message || 'An error occurred. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', overflow: 'hidden' }}>
      {/* Left container with background image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' },
          height: '100vh',
        }}
      />
      
      {/* Right container with login form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: '#333',
            }}
          >
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Mobile Number"
              fullWidth
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              margin="normal"
              required
              inputProps={{
                pattern: "[0-9]*",
                maxLength: 10,
                minLength: 10,
              }}
              helperText="Enter 10 digit mobile number"
              error={!validateMobileNo(mobileNo) && mobileNo !== ''}
            />

            <TextField
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              helperText="Password must be at least 6 characters"
              error={!validatePassword(password) && password !== ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label={showPassword ? 'hide password' : 'show password'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: '#3b3b6b',
                '&:hover': {
                  backgroundColor: '#2d2d52',
                },
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
