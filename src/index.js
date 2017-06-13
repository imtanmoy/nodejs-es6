import express from 'express';

const app = express();
import { port } from './config/config';

app.get('/', (req, res) => {
  res.send('Hello world!');
});


app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server running on port: ${port}
      ---
      Running on ${process.env.NODE_ENV}
    `);
  }
});
