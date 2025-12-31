import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div style={{ width: 250, backgroundColor: '#f4f4f4', height: '100vh' }}>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/wallets">
          <ListItemText primary="Wallets" />
        </ListItemButton>
        <ListItemButton component={Link} to="/transactions">
          <ListItemText primary="Transactions" />
        </ListItemButton>
        <ListItemButton component={Link} to="/cards">
          <ListItemText primary="Virtual Cards" />
        </ListItemButton>
        <ListItemButton component={Link} to="/recurring">
          <ListItemText primary="Recurring Payments" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Sidebar;
