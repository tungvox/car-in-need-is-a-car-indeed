import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', req.body, { withCredentials: true });
      res.status(200).json(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json({ error: error.response?.data?.error || 'Failed to login' });
      } else {
        const err = error as Error;  
        res.status(500).json({ error: err.message || 'Failed to login' });
      }
      console.error('Error during login:', error instanceof Error ? error.message : error);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
