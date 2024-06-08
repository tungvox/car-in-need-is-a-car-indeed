import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cookies from 'cookies';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const cookies = new Cookies(req, res);
      const token = cookies.get('token');

      if (!token) {
        return res.status(401).json({ error: 'No token found' });
      }

      const response = await axios.get('http://127.0.0.1:5000/user', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      res.status(200).json(response.data);
    } catch (error: any) {
      console.error('Error fetching user:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
