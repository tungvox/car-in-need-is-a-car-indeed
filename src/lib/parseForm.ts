import { IncomingForm, Fields, Files } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

export const parseForm = (req: NextApiRequest, res: NextApiResponse): Promise<{ fields: Fields; files: Files }> => {
  const form = new IncomingForm({
    keepExtensions: true,
    uploadDir: './uploads',
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
