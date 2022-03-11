import mongoose from 'mongoose';
import IWordInfo from '../../interfaces/IWordInfo';
import IDatabase from '../../interfaces/IDatabase';
import WordInfo from './models/WordInfo';

class MongoDB implements IDatabase {
  async connect() {
    const {
      MONGO_INITDB_ROOT_USERNAME: MONGO_USER,
      MONGO_INITDB_ROOT_PASSWORD: MONGO_PASSWORD,
    } = process.env;
    const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017`;
    await mongoose.connect(url);
  }

  async get(word: string) {
    try {
      const wordInfo = (await WordInfo.findOne({ word }))?.toObject();

      if (!wordInfo) return undefined;

      return {
        word: wordInfo.word,
        url: wordInfo.url,
        synonyms: wordInfo.synonyms,
        meanings: wordInfo.meanings.map((meaning) => ({ ...meaning, _id: undefined })),
        sentences: wordInfo.sentences?.map((sentence) => ({ ...sentence, _id: undefined })),
        syllables: wordInfo.syllables,
      };
    } catch (err) {
      return undefined;
    }
  }

  insert(wordInfo: IWordInfo) {
    WordInfo.create(wordInfo);
  }
}

export default MongoDB;
