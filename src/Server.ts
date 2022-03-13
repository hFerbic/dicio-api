import express from 'express';
import cors from 'cors';
import v2Routes from './routes/v2';
import v1Routes from './routes/v1';

export default class Server {
  app: express.Application;

  constructor() {
    this.app = express();
    const router = express.Router();

    this.app.use(cors());
    this.app.disable('x-powered-by');

    this.app.get('/favicon.ico', (_, res) => res.sendStatus(204));

    this.app.use(v1Routes(router));
    this.app.use(v2Routes(router));
  }

  start(PORT: number = 3333) {
    this.app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT}`);
    });
  }
}
