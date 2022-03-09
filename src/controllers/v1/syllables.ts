import { Request, Response } from 'express';
import extractSyllables from '../../scrappers/syllables';
import getCorrectLink from '../../utils/getCorrectLink';
import axiosClient from '../../utils/axiosClient';

export default async function syllablesController(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const link = await getCorrectLink(word);
    const { data: dicioHTML } = await axiosClient.get(link);
    const syllables = extractSyllables(dicioHTML);

    res.json(syllables);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
