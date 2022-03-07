import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import axiosClient from './services/axiosClient';
import sanitizeWord from './utils/sanitizeWord';

async function controller(req: Request, res: Response) {
  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word);

  try {
    const { data: dicioHTML } = await axiosClient.get(`https://dicio.com.br/${sanitizedWord}`);

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
