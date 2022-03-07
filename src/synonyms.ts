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

    const synonyms: string[] = [];

    $('.sinonimos').each((_, children) => {
      if ($(children).text().includes('é sinônimo de:')) {
        $('a', children).each((i, element) => {
          const text = $(element).text();

          if (text) synonyms.push(text);
        });
      }
    });

    res.json(synonyms);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export default controller;
