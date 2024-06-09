import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const makes = [
    { make: 'Toyota', models: ['Corolla', 'Camry', 'Prius'] },
    { make: 'Ford', models: ['Fiesta', 'Focus', 'Mustang'] },
    { make: 'Honda', models: ['Civic', 'Accord', 'Fit'] }
  ];
  res.status(200).json(makes);
};

export default handler;
