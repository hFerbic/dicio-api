import * as cheerio from 'cheerio';
import IMeaning from '../interfaces/IMeaning';

function extractMeanings(html: string) {
  const $ = cheerio.load(html);

  const meanings: IMeaning[] = [];
  const structure = {
    partOfSpeech: '',
    meanings: [],
    etymology: '',
  };

  meanings.push(structure);

  $('.significado span').each((_, element) => {
    const text = $(element).text();
    const cheerioElement = $(element);

    if (cheerioElement.hasClass('cl')) {
      if (
        meanings.length === 1
        && meanings[0].partOfSpeech === ''
        && meanings[0].meanings.length === 0
      ) {
        meanings[0].partOfSpeech = text;
      } else {
        meanings.push({ partOfSpeech: text, meanings: [], etymology: '' });
      }
    } else if (cheerioElement.hasClass('etim')) {
      meanings[meanings.length - 1].etymology = text;
    } else if (!cheerioElement.hasClass('tag')) {
      meanings[meanings.length - 1].meanings.push(text);
    }
  });

  if ($('.conjugacao').html()) meanings.push({ ...structure, meanings: [] });

  $('.conjugacao span').each((_, element) => {
    const text = $(element).text();
    const cheerioElement = $(element);

    if (cheerioElement.hasClass('etim')) {
      meanings[meanings.length - 1].etymology = text;
    } else if (!cheerioElement.hasClass('tag')) {
      meanings[meanings.length - 1].meanings.push(text);
    }
  });

  // In some cases the part of speech is not together with the meanings,
  // but in the end of list (at the 'adicional' class)
  if (meanings.length === 1 && meanings[0].partOfSpeech === '') {
    const partOfSpeech = $('p.adicional').text().match(/(?<=Classe gramatical: ).*(?=\n.)/gi);
    meanings[0].partOfSpeech = partOfSpeech ? partOfSpeech[0] : '';
  }

  return meanings;
}

export default extractMeanings;
