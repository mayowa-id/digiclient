import React from 'react';
import { Typography, Box, Grid, CircularProgress, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import WalletCard from '../components/WalletCard';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: wallets, isLoading } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => api.get('/wallets/my-wallets').then(res => res.data.data),
    enabled: !!user,
  });

  const totalBalance = wallets?.reduce((sum: number, wallet: any) => {
    return sum + (wallet.availableBalance || 0);  // Use availableBalance
  }, 0) || 0;

  return (
    <Box>
      {/* Header Section */}
      <Box 
        sx={{ 
          mb: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 3
        }}
      >
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'white',
              fontWeight: 800,
              mb: 1,
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dashboard
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(148, 163, 184, 0.8)',
              fontSize: 16 
            }}
          >
            Welcome back, {user?.sub}! Here's your financial overview
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/wallets')}
          sx={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            px: 4,
            py: 1.5,
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 15px 40px rgba(59, 130, 246, 0.4)',
            },
          }}
        >
          Create New Wallet
        </Button>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={12}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: 4,
              p: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
              <Typography variant="h6" sx={{ color: 'rgba(148, 163, 184, 0.8)', fontWeight: 600 }}>
                Total Wallets
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 800 }}>
              {wallets?.length || 0}
            </Typography>
          </Box>
        </Grid>

        <Grid size={12}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: 4,
              p: 4,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 80% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#22c55e' }} />
              <Typography variant="h6" sx={{ color: 'rgba(148, 163, 184, 0.8)', fontWeight: 600 }}>
                Total Balance
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 800 }}>
              {totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Wallets Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'white',
            fontWeight: 700,
            mb: 3
          }}
        >
          Your Wallets
        </Typography>

        {isLoading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress size={60} sx={{ color: '#3b82f6' }} />
          </Box>
        ) : wallets?.length === 0 ? (
          <Box 
            sx={{ 
              textAlign: 'center',
              py: 10,
              bgcolor: 'rgba(30, 41, 59, 0.5)',
              borderRadius: 4,
              border: '1px solid rgba(148, 163, 184, 0.1)',
            }}
          >
            <AccountBalanceWalletIcon 
              sx={{ 
                fontSize: 100, 
                color: 'rgba(59, 130, 246, 0.3)',
                mb: 3 
              }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white',
                fontWeight: 600,
                mb: 2 
              }}
            >
              No wallets yet
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(148, 163, 184, 0.8)',
                mb: 4 
              }}
            >
              Create your first wallet to start managing your finances
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => navigate('/my-wallets')}
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                px: 4,
                py: 1.5,
              }}
            >
              Create Wallet
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 4,
            }}
          >
            {wallets?.map((wallet: any) => (
              <WalletCard 
                key={wallet.walletNumber} 
                wallet={wallet} 
                onClick={() => navigate('/my-wallets')}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;