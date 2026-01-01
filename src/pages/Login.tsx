import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Link as MuiLink, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            p: 6,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Logo/Icon */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' },
                },
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              DigiWallet
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 600,
                mb: 1,
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(148, 163, 184, 0.8)',
              }}
            >
              Sign in to continue to your account
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(148, 163, 184, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(148, 163, 184, 0.7)',
                    '&.Mui-focused': {
                      color: '#3b82f6',
                    },
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(148, 163, 184, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(148, 163, 184, 0.7)',
                    '&.Mui-focused': {
                      color: '#3b82f6',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<LoginIcon />}
                sx={{
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 40px rgba(59, 130, 246, 0.4)',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          </form>

          {/* Divider */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              my: 4,
              '&::before, &::after': {
                content: '""',
                flex: 1,
                height: '1px',
                background: 'rgba(148, 163, 184, 0.2)',
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                px: 2,
                color: 'rgba(148, 163, 184, 0.6)',
                fontWeight: 600,
              }}
            >
              OR
            </Typography>
          </Box>

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(148, 163, 184, 0.8)' }}>
              Don't have an account?{' '}
              <MuiLink
                component={Link}
                to="/register"
                sx={{
                  color: '#3b82f6',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  '&:hover': {
                    color: '#60a5fa',
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;