import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  CircularProgress,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface RecurringPayment {
  id: string;
  sourceWalletNumber: string;
  destinationWalletNumber: string;
  amount: number;
  currency: string;
  frequency: string;
  nextExecutionDate: string;
  status: 'ACTIVE' | 'CANCELLED';
}

const RecurringPayments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    sourceWalletNumber: '',
    destinationWalletNumber: '',
    amount: '',
    frequency: 'MONTHLY',
  });

  const { data: wallets = [] } = useQuery({
    queryKey: ['wallets', user?.sub],
    queryFn: async () =>
      api.get(`/my-wallets/user/${user?.sub || user?.sub}`).then(r => r.data.data),
  });

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['recurring', user?.sub],
    queryFn: async () =>
      api.get(`/recurring-payments/user/${user?.sub || user?.sub}`).then(r => r.data.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/recurring-payments', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
      setOpen(false);
      setForm({
        sourceWalletNumber: '',
        destinationWalletNumber: '',
        amount: '',
        frequency: 'MONTHLY',
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/recurring-payments/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recurring'] }),
  });

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4">Recurring Payments</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpen(true)}>
          Schedule New
        </Button>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : payments.length === 0 ? (
        <Typography>No recurring payments set up.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Next Run</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((p: RecurringPayment) => (
                <TableRow key={p.id}>
                  <TableCell>{p.sourceWalletNumber}</TableCell>
                  <TableCell>{p.destinationWalletNumber}</TableCell>
                  <TableCell>
                    {p.amount} {p.currency}
                  </TableCell>
                  <TableCell>{p.frequency}</TableCell>
                  <TableCell>{new Date(p.nextExecutionDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={p.status}
                      color={p.status === 'ACTIVE' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      disabled={cancelMutation.isPending}
                      onClick={() => cancelMutation.mutate(p.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Recurring Payment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={12}>
              <TextField
                select
                label="From Wallet"
                value={form.sourceWalletNumber}
                onChange={e => setForm({ ...form, sourceWalletNumber: e.target.value })}
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
            </Grid>

            <Grid size={12}>
              <TextField
                label="To Wallet Number"
                value={form.destinationWalletNumber}
                onChange={e =>
                  setForm({ ...form, destinationWalletNumber: e.target.value })
                }
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Amount"
                type="number"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField
                select
                label="Frequency"
                value={form.frequency}
                onChange={e => setForm({ ...form, frequency: e.target.value })}
                fullWidth
                SelectProps={{ native: true }}
              >
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() =>
              createMutation.mutate({ ...form, amount: Number(form.amount) })
            }
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? <CircularProgress size={24} /> : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecurringPayments;
