import { Response, Request } from 'express';
import getWordInfo from '../../data/getWordInfo';

export default async function syllablesController(req: Request, res: Response) {
  const { word } = req.params;
  try {
    const { syllables } = await getWordInfo(word);
    res.json(syllables);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
