import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import axiosClient from '../../utils/axiosClient';
import sanitizeWord from '../../utils/sanitizeWord';

interface IMeaning {
  word: string;
  class: string;
  meanings: string[];
  etymology: string;
}

// Verifica se é um redireciomento
function isRedirectUrl(followUrl: string, i: number, $: cheerio.CheerioAPI) {
  if (`${followUrl}/` !== $("[rel$='canonical']").attr('href') && i > 1) {
    return true;
  }
  return false;
}

export default async function allMeaningsController(req: Request, res: Response) {
  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word);

  try {
    const meanings: IMeaning[] = [];

    let i = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const baseUrl = `https://www.dicio.com.br/${sanitizedWord}`;
        const followUrl = `https://www.dicio.com.br/${sanitizedWord}-${i}`;

        const { data: dicioHTML } = await axiosClient.get(i === 1 ? baseUrl : followUrl);

        const $ = cheerio.load(dicioHTML);

        if (isRedirectUrl(followUrl, i, $)) { break; }

        const structure = {
          word: '',
          class: '',
          meanings: [],
          etymology: '',
        };
        meanings.push(structure);

        meanings[meanings.length - 1].word = $('.title-header h1').text();

        $('.significado span').each((_, element) => {
          const text = $(element).text();
          const cheerioElement = $(element);

          if (cheerioElement.hasClass('cl')) {
            if (
              meanings[meanings.length - 1].class === ''
              && meanings[meanings.length - 1].meanings.length === 0
            ) {
              meanings[meanings.length - 1].class = text;
            } else {
              meanings.push({
                word,
                class: text,
                meanings: [],
                etymology: '',
              });
            }
          } else if (cheerioElement.hasClass('etim')) {
            meanings[meanings.length - 1].etymology = text;
          } else if (!cheerioElement.hasClass('tag')) {
            meanings[meanings.length - 1].meanings.push(text);
          }
        });
        $('.conjugacao span').each((_, element) => {
          const text = $(element).text();
          const cheerioElement = $(element);

          if (cheerioElement.hasClass('etim')) {
            meanings[meanings.length].etymology = text;
          } else if (!cheerioElement.hasClass('tag')) {
            meanings[meanings.length].meanings.push(text);
          }
        });
        i += 1;
      } catch (err) {
        break;
      }
    }
    res.json(meanings);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
