import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const makes = [
    { make: 'Audi', models: ['A3', 'A4', 'A6', 'Q5', 'Q7', 'Q3', 'A8'] },
    { make: 'BMW', models: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X1', '4 Series'] },
    { make: 'Chevrolet', models: ['Spark', 'Malibu', 'Impala', 'Tahoe', 'Silverado', 'Equinox', 'Traverse'] },
    { make: 'Ford', models: ['Fiesta', 'Focus', 'Mustang', 'Explorer', 'F-150', 'Escape', 'Edge'] },
    { make: 'Honda', models: ['Civic', 'Accord', 'Fit', 'CR-V', 'Pilot', 'HR-V', 'Ridgeline'] },
    { make: 'Hyundai', models: ['Elantra', 'Sonata', 'Santa Fe', 'Tucson', 'Palisade', 'Kona', 'Venue'] },
    { make: 'Jeep', models: ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator'] },
    { make: 'Kia', models: ['Rio', 'Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride', 'Stinger'] },
    { make: 'Mazda', models: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-30'] },
    { make: 'Mercedes-Benz', models: ['A-Class', 'C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class', 'GLA'] },
    { make: 'Nissan', models: ['Sentra', 'Altima', 'Maxima', 'Rogue', 'Murano', 'Pathfinder', 'Titan'] },
    { make: 'Subaru', models: ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'Ascent', 'WRX'] },
    { make: 'Tesla', models: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'] },
    { make: 'Toyota', models: ['Corolla', 'Camry', 'Prius', 'RAV4', 'Highlander', 'Tacoma', 'Tundra'] },
    { make: 'Volkswagen', models: ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Atlas', 'Beetle', 'ID.4'] },
    { make: 'Volvo', models: ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90'] },
  ];
  res.status(200).json(makes);
};

export default handler;
