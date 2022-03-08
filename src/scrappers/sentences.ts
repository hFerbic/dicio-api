import * as cheerio from 'cheerio';

interface ISentence {
  sentence: string;
  author: string;
}

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
