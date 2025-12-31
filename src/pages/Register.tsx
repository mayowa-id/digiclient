import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '', phoneNumber: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="email" label="Email" onChange={handleChange} fullWidth />
        <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth />
        <TextField name="firstName" label="First Name" onChange={handleChange} fullWidth />
        <TextField name="lastName" label="Last Name" onChange={handleChange} fullWidth />
        <TextField name="phoneNumber" label="Phone" onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained">Register</Button>
      </form>
    </Container>
  );
};

export default Register;