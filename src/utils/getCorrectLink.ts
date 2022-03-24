import * as cheerio from 'cheerio';
import axiosClient from './axiosClient';
import sanitizeWord from './sanitizeWord';

async function getCorrectLink(word: string): Promise<string> {
  const sanitizedWord = sanitizeWord(word);

  if (word === sanitizedWord) return word;

  const url = `https://dicio.com.br/pesquisa.php?q=${sanitizedWord}`;
  const { data: search, request } = await axiosClient.get(url);

  if (request.res.responseUrl !== url) {
    const regex = /(?<=https:\/\/www\.dicio\.com\.br\/).*(?=\/)/gi;
    if (regex.test(request.res.responseUrl)) {
      const [extractedWord] = request.res.responseUrl.match(regex);
      return extractedWord;
    }
  }

  const $Search = cheerio.load(search);

  const words = $Search('.resultados a').find('.list-link').toArray();

  const [correctWordVariation] = words.filter((variation) => $Search(variation).text() === word);

  const link = correctWordVariation.parentNode
    ? $Search(correctWordVariation.parentNode).attr('href')
    : '';

  return link || word;
}

export default getCorrectLink;
