"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { login } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      setUser(response);
      router.push('/');
    } catch (error: unknown) {
      setError('Failed to login');
      console.error('Failed to login', error);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Box width="100%" maxWidth={400}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Login
              </Button>
            </Box>
          </form>
          <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
            Don't have an account yet? <Link href="/signup">Create account</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
