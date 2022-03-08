import express from 'express';
import cors from 'cors';
import v1Routes from './routes/v1';

const PORT = process.env.PORT || 3333;

const app = express();
const router = express.Router();

app.use(cors());
app.disable('x-powered-by');

app.get('/favicon.ico', (_, res) => res.sendStatus(204));

app.use(v1Routes(router));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
