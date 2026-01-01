import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Link as MuiLink, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
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
        py: 6,
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
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' },
                },
              }}
            >
              <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
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
              Create Account
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(148, 163, 184, 0.8)',
              }}
            >
              Join us and start managing your finances
            </Typography>
          </Box>

          {/* Success Alert */}
          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                bgcolor: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#22c55e',
              }}
            >
              Account created successfully! Redirecting to login...
            </Alert>
          )}

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
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoFocus
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(148, 163, 184, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(139, 92, 246, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8b5cf6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(148, 163, 184, 0.7)',
                      '&.Mui-focused': {
                        color: '#8b5cf6',
                      },
                    },
                  }}
                />

                <TextField
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(148, 163, 184, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(139, 92, 246, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8b5cf6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(148, 163, 184, 0.7)',
                      '&.Mui-focused': {
                        color: '#8b5cf6',
                      },
                    },
                  }}
                />
              </Box>

              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(148, 163, 184, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(139, 92, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8b5cf6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(148, 163, 184, 0.7)',
                    '&.Mui-focused': {
                      color: '#8b5cf6',
                    },
                  },
                }}
              />

              <TextField
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(148, 163, 184, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(139, 92, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8b5cf6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(148, 163, 184, 0.7)',
                    '&.Mui-focused': {
                      color: '#8b5cf6',
                    },
                  },
                }}
              />

              <TextField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(148, 163, 184, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(139, 92, 246, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8b5cf6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(148, 163, 184, 0.7)',
                    '&.Mui-focused': {
                      color: '#8b5cf6',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<HowToRegIcon />}
                sx={{
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 40px rgba(139, 92, 246, 0.4)',
                  },
                }}
              >
                Create Account
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

          {/* Sign In Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(148, 163, 184, 0.8)' }}>
              Already have an account?{' '}
              <MuiLink
                component={Link}
                to="/login"
                sx={{
                  color: '#8b5cf6',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  '&:hover': {
                    color: '#a78bfa',
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign In
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;