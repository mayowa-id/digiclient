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
import VisibilityIcon from '@mui/icons-material/Visibility';
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
  loadingIds?: string[]; // for showing spinner on specific actions
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
      <Typography variant="body1" color="textSecondary" align="center" mt={4}>
        No virtual cards yet.
      </Typography>
    );
  }

  return (
    <>
      {cards.map((card) => (
        <Card
          key={card.id}
          sx={{
            mb: 3,
            bgcolor: card.status === 'ACTIVE' ? '#16213e' : '#424242',
            color: 'white',
            borderRadius: 3,
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                  {card.brand.toUpperCase()}
                </Typography>
                <Typography variant="h5" letterSpacing={2} mt={2}>
                  •••• •••• •••• {card.cardNumber.slice(-4)}
                </Typography>
                <Box display="flex" gap={4} mt={3}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      EXPIRES
                    </Typography>
                    <Typography variant="body1">
                      {card.expiryMonth}/{card.expiryYear.slice(-2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box textAlign="right">
                <Chip
                  label={card.status}
                  color={card.status === 'ACTIVE' ? 'success' : 'default'}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Box>
                  {card.status === 'ACTIVE' ? (
                    <Tooltip title="Block Card">
                      <IconButton
                        onClick={() => onBlock(card.id)}
                        disabled={loadingIds.includes(card.id)}
                        sx={{ color: 'white' }}
                      >
                        <BlockIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Unblock Card">
                      <IconButton
                        onClick={() => onUnblock(card.id)}
                        disabled={loadingIds.includes(card.id)}
                        sx={{ color: 'white' }}
                      >
                        <VisibilityOffIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete Card">
                    <IconButton
                      onClick={() => onDelete(card.id)}
                      disabled={loadingIds.includes(card.id)}
                      sx={{ color: '#ff4444' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default CardList;