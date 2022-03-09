import axiosClient from '../utils/axiosClient';
import IWordInfo from '../interfaces/IWordInfo';
import getCorrectLink from '../utils/getCorrectLink';
import extractMeanings from '../scrappers/meanings';
import extractSynonyms from '../scrappers/synonyms';
import extractSyllables from '../scrappers/syllables';
import extractSentences from '../scrappers/sentences';

export default async function getWordInfo(word: string): Promise<IWordInfo> {
  try {
    // from dicio.com.br
    const url = await getCorrectLink(word);
    const { data: html } = await axiosClient.get(url);

    const meanings = extractMeanings(html);
    const synonyms = extractSynonyms(html);
    const syllables = extractSyllables(html);
    const sentences = extractSentences(html);

    return {
      word,
      url,
      synonyms,
      meanings,
      sentences,
      syllables: syllables.syllablesText,
    };
  } catch (error) {
    throw new Error('Could not get word info');
  }
}
