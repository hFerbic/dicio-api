import { Request, Response } from 'express';
import extractSynonyms from '../../scrappers/synonyms';
import axiosClient from '../../services/axiosClient';
import getCorrectLink from '../../utils/getCorrectLink';

export default async function synonymsController(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const link = await getCorrectLink(word);
    const { data: dicioHTML } = await axiosClient.get(link);

    const synonyms = extractSynonyms(dicioHTML);

    res.json(synonyms);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
