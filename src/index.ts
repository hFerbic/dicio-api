import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from 'dotenv';
import v2Routes from './routes/v2';
import v1Routes from './routes/v1';

if (process.env.NODE_ENV === 'dev') {
  config({
    path: path.resolve(__dirname, '..', '.env'),
  });
}

const PORT = process.env.PORT || 3333;

const app = express();
const router = express.Router();

app.use(cors());
app.disable('x-powered-by');

app.get('/favicon.ico', (_, res) => res.sendStatus(204));

app.use(v1Routes(router));
app.use(v2Routes(router));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
