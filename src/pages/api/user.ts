import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;  
  try {
    const response = await axios.get(`http://127.0.0.1:5000/user`, { params: { id } });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export default handler;
