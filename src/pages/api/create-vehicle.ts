import { NextApiRequest, NextApiResponse } from 'next';
import { parseForm } from '../../lib/parseForm';
import axios from 'axios';
import Cookies from 'cookies';
import FormData from 'form-data';
import path from 'path';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req, res);

      const formData = new FormData();

      // Append fields to formData
      Object.keys(fields).forEach((key) => {
        const field = fields[key];
        if (field !== undefined) {
          if (Array.isArray(field)) {
            formData.append(key, field.join(','));
          } else {
            formData.append(key, field as string);
          }
          console.log(`${key}: ${field}`); // Log field key and value
        }
      });

      // Append files to formData
      if (files.images) {
        const images = Array.isArray(files.images) ? files.images : [files.images];
        images.forEach((image) => {
          const imagePath = path.join(process.cwd(), 'backend', 'uploads', path.basename(image.filepath)); // Ensure the correct path
          formData.append(
            'images',
            fs.createReadStream(imagePath), // Use fs.createReadStream to read the file correctly
            image.originalFilename || `image_${Date.now()}`
          );
          console.log(`images: ${imagePath}`); // Log image path
        });
      }

      const response = await axios.post('http://127.0.0.1:5000/vehicle', formData, {
        headers: {
          ...formData.getHeaders(), // Get headers from formData to set the correct Content-Type
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Failed to create vehicle:', error);
      res.status(500).json({ error: 'Failed to create vehicle' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
