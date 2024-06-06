"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../app/layout';
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
    <Layout>
      <h1 className="text-3xl font-bold">Profile</h1>
      <div>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Full Name: {user.fullname}</p>
      </div>
    </Layout>
  );
};

export default Profile;
