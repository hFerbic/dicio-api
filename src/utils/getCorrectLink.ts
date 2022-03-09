import * as cheerio from 'cheerio';
import axiosClient from './axiosClient';
import sanitizeWord from './sanitizeWord';

async function getCorrectLink(word: string): Promise<string> {
  const sanitizedWord = sanitizeWord(word);

  if (word === sanitizedWord) return word;

  const url = `https://dicio.com.br/pesquisa.php?q=${sanitizedWord}`;
  const { data: search } = await axiosClient.get(url);

  const $Search = cheerio.load(search);

  const words = $Search('.resultados a').find('.list-link').toArray();

  const [correctWordVariation] = words.filter((variation) => $Search(variation).text() === word);

  const link = correctWordVariation.parentNode
    ? $Search(correctWordVariation.parentNode).attr('href')
    : '';

  return link || word;
}

export default getCorrectLink;
