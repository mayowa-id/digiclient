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
  Avatar,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

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
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="textSecondary">Loading transactions...</Typography>
      </Box>
    );
  }

  if (transactions.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <SwapHorizIcon sx={{ fontSize: 80, color: 'rgba(148, 163, 184, 0.3)', mb: 2 }} />
        <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600 }}>
          No transactions found
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Your transaction history will appear here
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

  const getTypeIcon = (type: string) => {
    if (type.includes('DEPOSIT') || type.includes('CREDIT')) {
      return <ArrowDownwardIcon sx={{ fontSize: 18, color: '#22c55e' }} />;
    }
    if (type.includes('WITHDRAW') || type.includes('DEBIT')) {
      return <ArrowUpwardIcon sx={{ fontSize: 18, color: '#ef4444' }} />;
    }
    return <SwapHorizIcon sx={{ fontSize: 18, color: '#3b82f6' }} />;
  };

  return (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: 3,
        border: '1px solid rgba(148, 163, 184, 0.1)',
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHead>
          <TableRow 
            sx={{ 
              bgcolor: 'rgba(59, 130, 246, 0.05)',
              borderBottom: '2px solid rgba(59, 130, 246, 0.2)'
            }}
          >
            <TableCell sx={{ color: '#3b82f6', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow 
              key={tx.transactionRef}
              hover
              sx={{
                borderBottom: '1px solid rgba(148, 163, 184, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  bgcolor: 'rgba(59, 130, 246, 0.03)',
                  transform: 'scale(1.01)',
                },
                animation: `fadeIn 0.4s ease-in-out ${index * 0.05}s both`,
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(10px)' },
                  to: { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: '"Courier New", monospace',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 600,
                    fontSize: 13
                  }}
                >
                  {tx.transactionRef}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: tx.type.includes('DEPOSIT') || tx.type.includes('CREDIT')
                        ? 'rgba(34, 197, 94, 0.15)'
                        : tx.type.includes('WITHDRAW') || tx.type.includes('DEBIT')
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(59, 130, 246, 0.15)',
                      border: tx.type.includes('DEPOSIT') || tx.type.includes('CREDIT')
                        ? '1px solid rgba(34, 197, 94, 0.3)'
                        : tx.type.includes('WITHDRAW') || tx.type.includes('DEBIT')
                        ? '1px solid rgba(239, 68, 68, 0.3)'
                        : '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    {getTypeIcon(tx.type)}
                  </Avatar>
                  <Chip 
                    label={tx.type} 
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      bgcolor: 'rgba(148, 163, 184, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(148, 163, 184, 0.2)'
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: tx.type.includes('DEPOSIT') || tx.type.includes('CREDIT')
                      ? '#22c55e'
                      : tx.type.includes('WITHDRAW') || tx.type.includes('DEBIT')
                      ? '#ef4444'
                      : 'white',
                    fontSize: 16
                  }}
                >
                  {tx.type.includes('DEPOSIT') || tx.type.includes('CREDIT') ? '+' : '-'}
                  {tx.amount.toLocaleString()} {tx.currency}
                </Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(148, 163, 184, 0.8)',
                      fontFamily: '"Courier New", monospace',
                      fontSize: 12
                    }}
                  >
                    {tx.sourceWalletNumber || '—'}
                  </Typography>
                  <SwapHorizIcon sx={{ fontSize: 16, color: 'rgba(148, 163, 184, 0.5)' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(148, 163, 184, 0.8)',
                      fontFamily: '"Courier New", monospace',
                      fontSize: 12
                    }}
                  >
                    {tx.destinationWalletNumber || '—'}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={tx.status}
                  color={getStatusColor(tx.status)}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    boxShadow: tx.status === 'COMPLETED' 
                      ? '0 0 15px rgba(34, 197, 94, 0.3)'
                      : tx.status === 'FAILED'
                      ? '0 0 15px rgba(239, 68, 68, 0.3)'
                      : 'none',
                    animation: tx.status === 'PENDING' ? 'pulse 2s infinite' : 'none',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.6 }
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(148, 163, 184, 0.8)',
                    fontSize: 13
                  }}
                >
                  {new Date(tx.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;