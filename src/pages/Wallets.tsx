import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Wallet {
  walletNumber: string;
  currency: string;
  balance: {
    amount: number;
    currency: string;
  };
  createdAt: string;
}


const Wallets: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');

  const userId = user?.sub || user?.sub;

  const {
    data: wallets = [],
    isLoading,
    error,
  } = useQuery<Wallet[]>({
    queryKey: ['wallets', userId],
    queryFn: async () => {
      const res = await api.get(`/wallets/user/${userId}`);
      return res.data.data;
    },
    enabled: !!userId,
  });

  // Create wallet mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/wallets', {
        userId,
        currency: selectedCurrency,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      setOpenDialog(false);
      setSelectedCurrency('NGN');
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here later
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          My Wallets
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          Create New Wallet
        </Button>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" align="center" variant="h6">
          Failed to load wallets. Please try again later.
        </Typography>
      )}

      {/* Empty State */}
      {!isLoading && !error && wallets.length === 0 && (
        <Box textAlign="center" my={10}>
          <AccountBalanceWalletIcon
            sx={{ fontSize: 100, color: 'grey.300', mb: 3 }}
          />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No wallets yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create your first wallet to start managing your money.
          </Typography>
        </Box>
      )}

      

      {/* Wallets Grid */}
      {!isLoading && !error && wallets.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {wallets.map((wallet) => (
            <Card
              key={wallet.walletNumber}
              sx={{
                height: '100%',
                borderRadius: 3,
                boxShadow: 4,
                transition: '0.3s',
                '&:hover': { boxShadow: 8 },
              }}
            >
              <CardContent sx={{ pb: 3 }}>
                {/* Wallet Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mb={3}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Wallet Number
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                      <Tooltip title={wallet.walletNumber}>
                        <Typography
                          variant="h6"
                          fontFamily="monospace"
                          sx={{ letterSpacing: 0.5 }}
                        >
                          {wallet.walletNumber}
                        </Typography>
                      </Tooltip>
                      <IconButton
                        size="small"
                        onClick={() => copyToClipboard(wallet.walletNumber)}
                        color="primary"
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <AccountBalanceWalletIcon color="primary" fontSize="large" />
                </Box>

                {/* Balance */}
                <Box mb={3}>
                  <Typography variant="body2" color="text.secondary">
                    Available Balance
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" mt={1}>
                    {wallet.balance.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    <Chip
                      label={wallet.balance.currency}
                      size="small"
                      color="primary"
                      sx={{ ml: 1, fontWeight: 'bold' }}
                    />
                  </Typography>
                </Box>

                {/* Footer */}
                <Typography variant="caption" color="text.secondary">
                  Created on{' '}
                  {new Date(wallet.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Wallet Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Wallet</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              select
              label="Select Currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              fullWidth
              SelectProps={{ native: true }}
              helperText="Choose the primary currency for this wallet"
            >
              <option value="NGN">🇳🇬 NGN - Nigerian Naira</option>
              <option value="USD">🇺🇸 USD - US Dollar</option>
              <option value="EUR">🇪🇺 EUR - Euro</option>
              <option value="GBP">🇬🇧 GBP - British Pound</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenDialog(false)} size="large">
            Cancel
          </Button>
          <Button
            onClick={() => createMutation.mutate()}
            variant="contained"
            size="large"
            disabled={createMutation.isPending}
            sx={{ minWidth: 120 }}
          >
            {createMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Create Wallet'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Wallets;