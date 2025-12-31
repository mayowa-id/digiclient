import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface WalletCardProps {
  wallet: any;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{wallet.walletNumber}</Typography>
        <Typography>Balance: {wallet.balance.amount} {wallet.balance.currency}</Typography>
      </CardContent>
    </Card>
  );
};

export default WalletCard;