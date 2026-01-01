import React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import WalletCard from '../components/WalletCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
const { data: wallets } = useQuery({
  queryKey: ['wallets', user?.sub],
  queryFn: () => api.get(`/wallets/user/${user?.sub}`).then(res => res.data.data),
  enabled: !!user?.sub,
});

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '16px' }}>Dashboard</Typography>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {wallets?.map((wallet: any) => (
          <WalletCard key={wallet.walletNumber} wallet={wallet} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
