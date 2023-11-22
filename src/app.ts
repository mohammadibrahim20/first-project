import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();
const port = 3000;

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
