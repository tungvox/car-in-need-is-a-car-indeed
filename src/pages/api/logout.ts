import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cookies from 'cookies';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const cookies = new Cookies(req, res);
      const token = cookies.get('token');

      if (!token) {
        return res.status(401).json({ error: 'No token found' });
      }

      await axios.post('http://127.0.0.1:5000/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      cookies.set('token', '', { expires: new Date(0) }); // Clear the token

      res.status(200).json({ message: 'Logout successful' });
    } catch (error: any) {
      console.error('Error during logout:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to logout' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
