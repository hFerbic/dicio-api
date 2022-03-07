import * as cheerio from 'cheerio';
import { Request, Response } from 'express';
import axiosClient from './services/axiosClient';
import sanitizeWord from './utils/sanitizeWord';

interface ISentence {
  sentence: string;
  author: string;
}

async function getSentences(req: Request, res: Response) {
  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word);

  try {
    const { data: dicioHTML } = await axiosClient.get(`https://dicio.com.br/${sanitizedWord}`);

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
