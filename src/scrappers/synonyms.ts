import * as cheerio from 'cheerio';

function extractSynonyms(html: string) {
  const $ = cheerio.load(html);

  const synonyms: string[] = [];

  $('.sinonimos').each((_, children) => {
    if ($(children).text().includes('é sinônimo de:')) {
      $('a', children).each((i, element) => {
        const text = $(element).text();

        if (text) synonyms.push(text);
      });
    }
  });

  return synonyms;
}

export default extractSynonyms;
