import { Request, Response } from 'express';
import getCorrectLink from '../../utils/getCorrectLink';
import axiosClient from '../../services/axiosClient';
import extractSentences from '../../scrappers/sentences';

export default async function sentencesController(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const link = await getCorrectLink(word);
    const { data: dicioHTML } = await axiosClient.get(link);

    const sentences = extractSentences(dicioHTML);

    res.json(sentences);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
