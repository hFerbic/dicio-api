import * as cheerio from 'cheerio';

function extractSyllables(html: string) {
  const $ = cheerio.load(html);

  const additionalText = $('.adicional').text();
  const syllabicMatches = additionalText.match(/(?<=silábica: ).+(\n|$)/i);
  if (!syllabicMatches) {
    throw new Error(`Could not parse syllabic matches from "${additionalText}"`);
  }

  return syllabicMatches[0].trim().split('-');
}

export default extractSyllables;
