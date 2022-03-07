import * as cheerio from 'cheerio';
import { Request, Response } from 'express';
import getCorrectLink from './utils/getCorrectLink';
import axiosClient from './services/axiosClient';

interface ISentence {
  sentence: string;
  author: string;
}

async function getSentences(req: Request, res: Response) {
  const { word } = req.params;

  try {
    const link = await getCorrectLink(word);
    const { data: dicioHTML } = await axiosClient.get(link);

    const $ = cheerio.load(dicioHTML);

    const sentences: ISentence[] = [];

    $('.frase').each((_, element) => {
      $('br', element).replaceWith(' ');

      const author = $('em', element).remove();

      sentences.push({
        sentence: $(element).text().replace(/\n/g, '').trim(),
        author: $(author).text().trim(),
      });
    });

    res.json(sentences);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export default getSentences;
