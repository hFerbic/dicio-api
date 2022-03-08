import * as cheerio from 'cheerio';

function extractSyllables(html: string) {
  const $ = cheerio.load(html);

  const additionalText = $('.adicional').text();
  const syllabicMatches = additionalText.match(/(?<=silábica: ).+(\n|$)/i);
  if (!syllabicMatches) {
    throw new Error(`Could not parse silabic matches from "${additionalText}"`);
  }

  const syllablesInfo = {
    syllablesText: syllabicMatches[0].trim(),
    syllablesCount: syllabicMatches[0].split('-').length,
  };

  return syllablesInfo;
}

export default extractSyllables;
