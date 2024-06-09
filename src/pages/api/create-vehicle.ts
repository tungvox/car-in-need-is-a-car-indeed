import { NextApiRequest, NextApiResponse } from 'next';
import { parseForm } from '../../lib/parseForm';
import axios from 'axios';
import Cookies from 'cookies';
import FormData from 'form-data';
import formidable from 'formidable';

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
      Object.keys(fields).forEach((key) => {
        const field = fields[key];
        if (field !== undefined) {
          if (Array.isArray(field)) {
            formData.append(key, field.join(','));
          } else {
            formData.append(key, field as string);
          }
        }
      });

      if (files.images) {
        const images = Array.isArray(files.images) ? files.images : [files.images];
        images.forEach((image, index) => {
          formData.append(
            `images_${index}`,
            image.filepath,
            image.originalFilename || `image_${index}`
          );
        });
      }

      const response = await axios.post('http://127.0.0.1:5000/vehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
