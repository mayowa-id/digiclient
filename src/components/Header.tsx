import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mr: 3
            }}
          >
            DigiWallet
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              bgcolor: 'rgba(59, 130, 246, 0.1)',
              px: 2,
              py: 0.75,
              borderRadius: 2,
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
          >
            <Avatar 
              sx={{ 
                width: 28, 
                height: 28, 
                mr: 1.5,
                bgcolor: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                fontSize: 14,
                fontWeight: 700
              }}
            >
              {user?.sub?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#3b82f6',
                fontWeight: 600
              }}
            >
              {user?.sub}
            </Typography>
          </Box>
        </Box>
        
        <Button 
          color="inherit" 
          onClick={logout}
          startIcon={<LogoutIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            bgcolor: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              bgcolor: 'rgba(239, 68, 68, 0.2)',
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
            }
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;