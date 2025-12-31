import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
} from '@mui/material';

interface Transaction {
  transactionRef: string;
  type: string;
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'FLAGGED';
  sourceWalletNumber?: string;
  destinationWalletNumber?: string;
  createdAt: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, loading = false }) => {
  if (loading) {
    return <Typography>Loading transactions...</Typography>;
  }

  if (transactions.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Typography variant="h6" color="textSecondary">
          No transactions found
        </Typography>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'error';
      default: return 'default';
    }
  };

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Reference</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Amount</strong></TableCell>
            <TableCell><strong>From → To</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.transactionRef} hover>
              <TableCell>{tx.transactionRef}</TableCell>
              <TableCell>
                <Chip label={tx.type} size="small" />
              </TableCell>
              <TableCell>
                <strong>
                  {tx.amount.toLocaleString()} {tx.currency}
                </strong>
              </TableCell>
              <TableCell>
                {tx.sourceWalletNumber || '—'} → {tx.destinationWalletNumber || '—'}
              </TableCell>
              <TableCell>
                <Chip
                  label={tx.status}
                  color={getStatusColor(tx.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {new Date(tx.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;