import axios from 'axios';
import Cookies from 'js-cookie';

export const signup = async (user) => {
  try {
    const response = await axios.post('/api/signup', user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Failed to signup';
      console.error('Error during signup:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Error during signup:', error);
      throw new Error('Failed to signup');
    }
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post('/api/login', user, { withCredentials: true });
    Cookies.set('token', response.data.token); // Save JWT token in cookies
    console.log('Token set in cookies:', response.data.token); // Add logging
    return response.data.user; // Return the user data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Failed to login';
      console.error('Error during login:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Error during login:', error);
      throw new Error('Failed to login');
    }
  }
};

export const logout = async () => {
  try {
    await axios.post('/api/logout', {}, { withCredentials: true });
    Cookies.remove('token'); // Remove JWT token from cookies
    console.log('Token removed from cookies'); // Add logging
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Failed to logout';
      console.error('Error during logout:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Error during logout:', error);
      throw new Error('Failed to logout');
    }
  }
};

export const getUser = async () => {
  const token = Cookies.get('token');
  console.log('Token from cookies:', token); // Add logging
  if (!token) throw new Error('No token found');
  try {
    const response = await axios.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log('Fetched user data:', response.data); // Add logging
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch user';
      console.error('Error fetching user:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }
};
