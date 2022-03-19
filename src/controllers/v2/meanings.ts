import { Response, Request } from 'express';
import getWordInfo from '../../data/getWordInfo';

export default async function meaningsController(req: Request, res: Response) {
  const { word } = req.params;
  try {
    const { meanings } = await getWordInfo(word);
    res.json(meanings);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
