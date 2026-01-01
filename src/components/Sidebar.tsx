import React, { useState } from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RepeatIcon from '@mui/icons-material/Repeat';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Wallets', icon: <AccountBalanceWalletIcon />, path: '/wallets' },
    { text: 'Transactions', icon: <ReceiptLongIcon />, path: '/transactions' },
    { text: 'Virtual Cards', icon: <CreditCardIcon />, path: '/cards' },
    { text: 'Recurring Payments', icon: <RepeatIcon />, path: '/recurring' },
  ];

  return (
    <Box
      sx={{
        width: 280,
        background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)',
        height: '100vh',
        borderRight: '1px solid rgba(148, 163, 184, 0.1)',
        p: 3,
        position: 'sticky',
        top: 0,
      }}
    >
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 3,
                mb: 1,
                py: 1.5,
                px: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                bgcolor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                '&:hover': {
                  bgcolor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(148, 163, 184, 0.05)',
                  transform: 'translateX(8px)',
                  borderColor: isActive ? 'rgba(59, 130, 246, 0.4)' : 'rgba(148, 163, 184, 0.2)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? '#3b82f6' : 'rgba(148, 163, 184, 0.6)',
                  minWidth: 40,
                  transition: 'all 0.3s',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.8)',
                  fontSize: 15,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box
        sx={{
          position: 'absolute',
          bottom: 30,
          left: 20,
          right: 20,
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="caption" sx={{ color: 'rgba(148, 163, 184, 0.8)', fontWeight: 600, mb: 1, display: 'block' }}>
          💡 Pro Tip
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 13, lineHeight: 1.5 }}>
          Create virtual cards for online shopping to protect your main wallet!
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;