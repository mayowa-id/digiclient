import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface WalletCardProps {
  wallet: any;
  onClick?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(wallet.walletNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        '&:hover': onClick ? {
          transform: 'translateY(-12px)',
          boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        } : {},
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(148, 163, 184, 0.7)', 
                fontWeight: 700, 
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontSize: 11
              }}
            >
              Wallet Number
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'white',
                  fontFamily: '"Courier New", monospace',
                  fontWeight: 600,
                  fontSize: 15
                }}
              >
                {wallet.walletNumber}
              </Typography>
              <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{
                    color: copied ? '#22c55e' : '#3b82f6',
                    bgcolor: copied ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: copied ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <AccountBalanceWalletIcon 
            sx={{ 
              fontSize: 48, 
              color: 'rgba(59, 130, 246, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'rotate(12deg) scale(1.1)' : 'rotate(0) scale(1)'
            }} 
          />
        </Box>

        <Box mb={3}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(148, 163, 184, 0.7)',
              fontWeight: 600,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: 1
            }}
          >
            Available Balance
          </Typography>
          <Box display="flex" alignItems="baseline" gap={2} mt={1}>
            <Typography 
              variant="h3" 
              sx={{ 
                color: 'white',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1
              }}
            >
              {wallet.balance.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Chip
              label={wallet.balance.currency}
              size="small"
              sx={{
                bgcolor: 'rgba(59, 130, 246, 0.15)',
                color: '#3b82f6',
                fontWeight: 700,
                fontSize: 12,
                border: '1px solid rgba(59, 130, 246, 0.3)',
                height: 24
              }}
            />
          </Box>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: 'rgba(34, 197, 94, 0.9)',
            bgcolor: 'rgba(34, 197, 94, 0.05)',
            px: 2,
            py: 1,
            borderRadius: 2,
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}
        >
          <TrendingUpIcon sx={{ fontSize: 18 }} />
          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: 12 }}>
            Active since {new Date(wallet.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WalletCard;