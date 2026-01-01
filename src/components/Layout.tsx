import React from 'react';
import { Box } from '@mui/material';
import Header from './Header'
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, p: 4 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;