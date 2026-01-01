import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';

interface VirtualCard {
  id: string;
  cardNumber: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  status: 'ACTIVE' | 'BLOCKED' | 'DELETED';
}

interface CardListProps {
  cards: VirtualCard[];
  onBlock: (id: string) => void;
  onUnblock: (id: string) => void;
  onDelete: (id: string) => void;
  loadingIds?: string[];
}

const CardList: React.FC<CardListProps> = ({
  cards,
  onBlock,
  onUnblock,
  onDelete,
  loadingIds = [],
}) => {
  if (cards.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <CreditCardIcon sx={{ fontSize: 80, color: 'rgba(139, 92, 246, 0.3)', mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          No virtual cards yet. Create one to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
      gap: 4 
    }}>
      {cards.map((card) => (
        <Card
          key={card.id}
          sx={{
            background: card.status === 'ACTIVE' 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #434343 0%, #000000 100%)',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            '&:hover': {
              transform: 'translateY(-12px) scale(1.02)',
              boxShadow: card.status === 'ACTIVE' 
                ? '0 20px 60px rgba(102, 126, 234, 0.5)'
                : '0 20px 60px rgba(0, 0, 0, 0.7)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
              pointerEvents: 'none',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              opacity: 0,
              transition: 'opacity 0.4s',
            },
            '&:hover::after': {
              opacity: 1,
            }
          }}
        >
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={5}>
              <Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontWeight: 700, 
                    letterSpacing: 2,
                    textTransform: 'uppercase'
                  }}
                >
                  {card.brand}
                </Typography>
                <Chip
                  label={card.status}
                  size="small"
                  sx={{
                    mt: 1,
                    bgcolor: card.status === 'ACTIVE' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)',
                    color: card.status === 'ACTIVE' ? '#22c55e' : '#ef4444',
                    fontWeight: 700,
                    fontSize: 11,
                    border: card.status === 'ACTIVE' ? '1.5px solid rgba(34, 197, 94, 0.4)' : '1.5px solid rgba(239, 68, 68, 0.4)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </Box>
              <CreditCardIcon sx={{ fontSize: 45, color: 'rgba(255,255,255,0.25)' }} />
            </Box>

            <Typography 
              variant="h5" 
              sx={{ 
                letterSpacing: 5, 
                fontFamily: '"Courier New", monospace',
                fontWeight: 300,
                color: 'white',
                mb: 5,
                fontSize: 24,
                textShadow: '0 3px 15px rgba(0,0,0,0.4)'
              }}
            >
              •••• •••• •••• {card.cardNumber.slice(-4)}
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
              <Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    fontSize: 10, 
                    letterSpacing: 2,
                    fontWeight: 600
                  }}
                >
                  VALID THRU
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white', 
                    fontFamily: '"Courier New", monospace', 
                    fontWeight: 600,
                    mt: 0.5 
                  }}
                >
                  {card.expiryMonth}/{card.expiryYear.slice(-2)}
                </Typography>
              </Box>

              <Box display="flex" gap={1}>
                {card.status === 'ACTIVE' ? (
                  <Tooltip title="Block Card" arrow>
                    <IconButton
                      onClick={() => onBlock(card.id)}
                      disabled={loadingIds.includes(card.id)}
                      sx={{ 
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': { 
                          bgcolor: 'rgba(255,255,255,0.25)', 
                          transform: 'scale(1.15) rotate(5deg)',
                          boxShadow: '0 5px 20px rgba(255,255,255,0.3)'
                        },
                      }}
                      size="small"
                    >
                      <BlockIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Unblock Card" arrow>
                    <IconButton
                      onClick={() => onUnblock(card.id)}
                      disabled={loadingIds.includes(card.id)}
                      sx={{ 
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': { 
                          bgcolor: 'rgba(255,255,255,0.25)', 
                          transform: 'scale(1.15) rotate(-5deg)',
                          boxShadow: '0 5px 20px rgba(255,255,255,0.3)'
                        },
                      }}
                      size="small"
                    >
                      <VisibilityOffIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Delete Card" arrow>
                  <IconButton
                    onClick={() => onDelete(card.id)}
                    disabled={loadingIds.includes(card.id)}
                    sx={{ 
                      color: '#ef4444',
                      bgcolor: 'rgba(239, 68, 68, 0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': { 
                        bgcolor: 'rgba(239, 68, 68, 0.25)', 
                        transform: 'scale(1.15) rotate(5deg)',
                        boxShadow: '0 5px 20px rgba(239, 68, 68, 0.5)'
                      },
                    }}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CardList;