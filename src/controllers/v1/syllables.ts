import { Request, Response } from 'express';
import getWordInfo from '../../data/getWordInfo';

interface IResponse {
  syllablesText: string;
  syllablesCount: number;
}

export default async function syllablesController(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const { syllables } = await getWordInfo(word);

    const response: IResponse = {
      syllablesText: syllables.join('-'),
      syllablesCount: syllables.length,
    };

    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
