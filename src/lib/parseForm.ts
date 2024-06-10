import { IncomingForm, Fields, Files } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export const parseForm = (req: NextApiRequest, res: NextApiResponse): Promise<{ fields: Fields; files: Files }> => {
  const uploadDir = path.join(process.cwd(), 'backend', 'uploads');  // Ensure this points to the 'backend/uploads' directory

  const form = new IncomingForm({
    keepExtensions: true,
    uploadDir,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};
