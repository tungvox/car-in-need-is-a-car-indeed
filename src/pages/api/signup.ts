import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://127.0.0.1:5000/signup', req.body);
      res.status(200).json(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Failed to signup';
        console.error('Error during signup:', errorMessage); 
        res.status(error.response?.status || 500).json({ error: errorMessage, details: error.response?.data });
      } else {
        const err = error as Error;  
        console.error('Error during signup:', err.message);  
        res.status(500).json({ error: err.message || 'Failed to signup' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
