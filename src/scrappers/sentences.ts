import * as cheerio from 'cheerio';
import ISentence from '../interfaces/ISentence';

function extractSentences(html: string) {
  const $ = cheerio.load(html);

  const sentences: ISentence[] = [];

  $('.frase').each((_, element) => {
    $('br', element).replaceWith(' ');

    const author = $('em', element).remove();

    sentences.push({
      sentence: $(element).text().replace(/\n/g, '').trim(),
      author: $(author).text().trim(),
    });
  });

  return sentences;
}

export default extractSentences;
