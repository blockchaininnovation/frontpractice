import express from 'express';
import cors from 'cors';
import path from 'path';

import pingRouter from './routes/ping';
import echoRouter from './routes/echo';
import uploadRouter from './routes/upload';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

app.use('/api/ping', pingRouter);
app.use('/api/echo', echoRouter);
app.use('/api/upload', uploadRouter);

// 静的ファイル
app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));

export default app;