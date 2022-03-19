import { Request, Response } from 'express';
import getWordInfo from '../../data/getWordInfo';

export default async function sentencesController(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const { sentences } = await getWordInfo(word);
    res.json(sentences);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
