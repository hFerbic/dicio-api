import { Response, Request } from 'express';
import sentencesControllerV1 from '../v1/sentences';

export default async function sentencesController(req: Request, res: Response) {
  sentencesControllerV1(req, res);
}
