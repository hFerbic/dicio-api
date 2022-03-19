import { Response, Request } from 'express';
import synonymsControllerV1 from '../v1/synonyms';

export default async function synonymsController(req: Request, res: Response) {
  synonymsControllerV1(req, res);
}
