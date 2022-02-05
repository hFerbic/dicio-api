import express from 'express';
import cors from 'cors';
import allMeanings from './allMeanings';
import meanings from './meanings';
import syllables from './syllables';
import synonyms from './synonyms';
import sentences from './sentences';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.disable('x-powered-by');

app.get('/:word', meanings);

app.get('/allMeanings/:word', allMeanings);
app.get('/meanings/:word', meanings);
app.get('/synonyms/:word', synonyms);
app.get('/syllables/:word', syllables);
app.get('/sentences/:word', sentences);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
