import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import getCorrectLink from './utils/getCorrectLink';
import axiosClient from './services/axiosClient';

async function controller(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const link = await getCorrectLink(word);
    const { data: dicioHTML } = await axiosClient.get(link);

    const $ = cheerio.load(dicioHTML);

    const additionalText = $('.adicional').text();
    const syllabicMatches = additionalText.match(/(?<=silábica: ).+(\n|$)/i);
    if (!syllabicMatches) {
      throw new Error(`Could not parse silabic matches from "${additionalText}"`);
    }

    const syllablesInfo = {
      syllablesText: syllabicMatches[0].trim(),
      syllablesCount: syllabicMatches[0].split('-').length,
    };

    res.json(syllablesInfo);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export default controller;
