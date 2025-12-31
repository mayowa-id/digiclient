import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Wallets from './pages/Wallets';
import Transactions from './pages/Transactions';
import VirtualCards from './pages/VirtualCards';
import RecurringPayments from './pages/RecurringPayments';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ flex: 1 }}>
                      <Header />
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/wallets" element={<Wallets />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/cards" element={<VirtualCards />} />
                        <Route path="/recurring" element={<RecurringPayments />} />
                      </Routes>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;