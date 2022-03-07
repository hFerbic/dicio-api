import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import axiosClient from './services/axiosClient';
import getCorrectLink from './utils/getCorrectLink';

async function controller(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const link = await getCorrectLink(word);
    const { data: dicioHTML } = await axiosClient.get(link);

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
