/* eslint-disable no-unused-vars */
import IWordInfo from './IWordInfo';

interface IDatabase {
  get(word: string): Promise<IWordInfo|undefined>;
  insert(word: IWordInfo): void;
}

export default IDatabase;
