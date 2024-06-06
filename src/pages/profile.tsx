"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { User } from '../types';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/api/user', { params: { id: '1' } });
      setUser(res.data);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Full Name: {user.fullname}</p>
      </div>
    </Container>
  );
};

export default Profile;
