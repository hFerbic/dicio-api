import { Router } from 'express';
import allMeanings from '../controllers/v1/allMeanings';
import meanings from '../controllers/v1/meanings';
import syllables from '../controllers/v1/syllables';
import synonyms from '../controllers/v1/synonyms';
import sentences from '../controllers/v1/sentences';

export default function v1Routes(router: Router) {
  router.get('/:word', meanings);

  router.get('/allMeanings/:word', allMeanings);
  router.get('/meanings/:word', meanings);
  router.get('/synonyms/:word', synonyms);
  router.get('/syllables/:word', syllables);
  router.get('/sentences/:word', sentences);

  return router;
}
