import { Response, Request } from 'express';
import getWordInfo from '../../data/getWordInfo';

interface IResponse {
  class: string;
  meanings: string[];
  etymology: string;
}

export default async function meaningController(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const { meanings } = await getWordInfo(word);

    const response: IResponse[] = meanings.map((meaning) => ({
      class: meaning.partOfSpeech,
      meanings: meaning.meanings,
      etymology: meaning.etymology,
    }));

    res.json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
