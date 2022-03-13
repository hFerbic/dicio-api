import path from 'path';
import { config } from 'dotenv';
import Server from './Server';
import database from './data/mongodb/mongodb';
import log from './utils/logger';

(async () => {
  if (process.env.NODE_ENV === 'dev') {
    config({
      path: path.resolve(__dirname, '..', '.env'),
    });
  }

  await database.connect().catch(log);

  const server = new Server();

  server.start(Number(process.env.PORT) || 3333);
})();
