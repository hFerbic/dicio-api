import { Response, Request } from 'express';
import axiosClient from '../../utils/axiosClient';
import getCorrectLink from '../../utils/getCorrectLink';
import extractMeanings from '../../scrappers/meanings';

export default async function meaningController(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const link = await getCorrectLink(word);
    const { data: dicioHTML } = await axiosClient.get(link);
    const meanings = extractMeanings(dicioHTML);

    res.json(meanings);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
