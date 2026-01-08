import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface VirtualCard {
  id: string;
  cardNumber: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  status: 'ACTIVE' | 'BLOCKED' | 'DELETED';
  walletNumber: string;
}

const VirtualCards: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');

  const { data: wallets = [] } = useQuery({
    queryKey: ['wallets'],
    queryFn: async () => api.get('/wallets/my-wallets').then(res => res.data.data),
    enabled: !!user,
  });

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => api.get('/cards/my-cards').then(res => res.data.data),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: () => api.post('/cards', { walletNumber: selectedWallet }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      setOpen(false);
      setSelectedWallet('');
    },
  });

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Virtual Cards</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create Card
        </Button>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : cards.length === 0 ? (
        <Typography>No virtual cards yet. Create one to start spending!</Typography>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {cards.map((card: VirtualCard) => (
            <Card key={card.id} sx={{ position: 'relative', bgcolor: '#1a1a2e', color: 'white' }}>
              {/* Rest of card content stays the same */}
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Virtual Card</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Link to Wallet"
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
            SelectProps={{ native: true }}
          >
            <option value="">-- Select Wallet --</option>
            {wallets.map((w: any) => (
              <option key={w.walletNumber} value={w.walletNumber}>
                {w.walletNumber} ({w.availableBalance} {w.currency})
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => createMutation.mutate()}
            variant="contained"
            disabled={!selectedWallet || createMutation.isPending}
          >
            Create Card
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VirtualCards;