import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Tab,
  Tabs,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Transactions = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState(0);
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  const { data: wallets = [] } = useQuery({
    queryKey: ['wallets', user?.sub],
    queryFn: async () => {
      const res = await api.get(`/wallets/user/${user?.sub || user?.userId}`);
      return res.data.data;
    },
    enabled: !!user,
  });

  const { data: transactions = { content: [] }, isLoading } = useQuery({
    queryKey: ['transactions', selectedWallet],
    queryFn: async () => {
      const res = await api.get(`/transactions/wallet/${selectedWallet}`);
      return res.data.data;
    },
    enabled: !!selectedWallet,
  });

  const transferMutation = useMutation({
    mutationFn: (data: any) => api.post('/transactions/transfer', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setAmount('');
      setDestination('');
    },
  });

  const depositMutation = useMutation({
    mutationFn: (data: any) => api.post('/transactions/deposit', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setAmount('');
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: (data: any) => api.post('/transactions/withdraw', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setAmount('');
    },
  });

  const handleDeposit = () => {
    if (!selectedWallet || !amount) return;

    depositMutation.mutate({
      walletNumber: selectedWallet,
      amount: Number(amount),
    });
  };

  const handleWithdraw = () => {
    if (!selectedWallet || !amount) return;

    withdrawMutation.mutate({
      walletNumber: selectedWallet,
      amount: Number(amount),
    });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 4 }}>
        <Tab label="History" />
        <Tab label="Transfer" />
        <Tab label="Deposit / Withdraw" />
      </Tabs>

      {tab === 0 && (
        <Box>
          <TextField
            select
            label="Select Wallet"
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
            fullWidth
            SelectProps={{ native: true }}
            sx={{ mb: 3, maxWidth: 400 }}
          >
            <option value="">-- Choose a wallet --</option>
            {wallets.map((w: any) => (
              <option key={w.walletNumber} value={w.walletNumber}>
                {w.walletNumber} ({w.balance.amount} {w.balance.currency})
              </option>
            ))}
          </TextField>

          {isLoading ? (
            <CircularProgress />
          ) : transactions.content.length === 0 ? (
            <Typography>No transactions yet.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ref</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.content.map((tx: any) => (
                    <TableRow key={tx.transactionRef}>
                      <TableCell>{tx.transactionRef}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>
                        {tx.amount.toLocaleString()} {tx.currency}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={tx.status}
                          size="small"
                          color={
                            tx.status === 'COMPLETED'
                              ? 'success'
                              : tx.status === 'FAILED'
                              ? 'error'
                              : 'warning'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {tab === 1 && (
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Send Money
            </Typography>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TextField
                select
                label="From Wallet"
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                fullWidth
                SelectProps={{ native: true }}
              >
                <option value="">-- Select --</option>
                {wallets.map((w: any) => (
                  <option key={w.walletNumber} value={w.walletNumber}>
                    {w.walletNumber}
                  </option>
                ))}
              </TextField>

              <TextField
                label="To Wallet Number"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                fullWidth
              />

              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />

              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() =>
                  transferMutation.mutate({
                    sourceWalletNumber: selectedWallet,
                    destinationWalletNumber: destination,
                    amount: Number(amount),
                  })
                }
                disabled={transferMutation.isPending}
                fullWidth
              >
                {transferMutation.isPending ? (
                  <CircularProgress size={24} />
                ) : (
                  'Transfer'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '32px',
          maxWidth: '900px'
        }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="success.main">
                <DownloadIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Deposit
              </Typography>

              <TextField
                select
                label="Wallet"
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                SelectProps={{ native: true }}
              >
                <option value="">-- Select --</option>
                {wallets.map((w: any) => (
                  <option key={w.walletNumber} value={w.walletNumber}>
                    {w.walletNumber}
                  </option>
                ))}
              </TextField>

              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="success"
                onClick={handleDeposit}
                disabled={depositMutation.isPending || !selectedWallet || !amount}
                fullWidth
              >
                {depositMutation.isPending ? <CircularProgress size={24} /> : 'Deposit'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error.main">
                <ArrowUpwardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Withdraw
              </Typography>

              <TextField
                select
                label="Wallet"
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                SelectProps={{ native: true }}
              >
                <option value="">-- Select --</option>
                {wallets.map((w: any) => (
                  <option key={w.walletNumber} value={w.walletNumber}>
                    {w.walletNumber}
                  </option>
                ))}
              </TextField>

              <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="error"
                onClick={handleWithdraw}
                disabled={withdrawMutation.isPending || !selectedWallet || !amount}
                fullWidth
              >
                {withdrawMutation.isPending ? <CircularProgress size={24} /> : 'Withdraw'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </Box>
  );
};

export default Transactions;