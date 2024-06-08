import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cookies from 'js-cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = Cookies.get('token');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const response = await axios.get('http://127.0.0.1:5000/my-listings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch my listings' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
