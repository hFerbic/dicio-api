import { Request, Response } from 'express';
import getWordInfo from '../../data/getWordInfo';

export default async function synonymsController(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const { synonyms } = await getWordInfo(word);
    res.json(synonyms);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
