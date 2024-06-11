import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: 'Filename is required' });
  }

  const url = `http://127.0.0.1:5000/uploads/${filename}`;
  return res.status(200).json({ url });
};

export default handler;
