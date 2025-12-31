import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';

interface Wallet {
  walletNumber: string;
  balance: { amount: number; currency: string };
}

interface RecurringPaymentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  wallets: Wallet[];
  loading: boolean;
  formData: {
    sourceWalletNumber: string;
    destinationWalletNumber: string;
    amount: string;
    frequency: string;
  };
  onFormChange: (field: string, value: string) => void;
}

const RecurringPaymentForm: React.FC<RecurringPaymentFormProps> = ({
  open,
  onClose,
  onSubmit,
  wallets,
  loading,
  formData,
  onFormChange,
}) => {
  const handleSubmit = () => {
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Schedule Recurring Payment</DialogTitle>

      <DialogContent dividers>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
          <TextField
            select
            label="From Wallet"
            value={formData.sourceWalletNumber}
            onChange={(e) =>
              onFormChange('sourceWalletNumber', e.target.value)
            }
            fullWidth
            SelectProps={{ native: true }}
            required
          >
            <option value="">-- Select Wallet --</option>
            {wallets.map((w) => (
              <option key={w.walletNumber} value={w.walletNumber}>
                {w.walletNumber} ({w.balance.amount} {w.balance.currency})
              </option>
            ))}
          </TextField>

          <TextField
            label="To Wallet Number"
            value={formData.destinationWalletNumber}
            onChange={(e) =>
              onFormChange('destinationWalletNumber', e.target.value)
            }
            fullWidth
            required
          />

          <TextField
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => onFormChange('amount', e.target.value)}
            fullWidth
            required
            inputProps={{ min: 1 }}
          />

          <TextField
            select
            label="Frequency"
            value={formData.frequency}
            onChange={(e) => onFormChange('frequency', e.target.value)}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </TextField>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            loading ||
            !formData.sourceWalletNumber ||
            !formData.destinationWalletNumber ||
            !formData.amount
          }
        >
          {loading ? <CircularProgress size={24} /> : 'Schedule Payment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecurringPaymentForm;