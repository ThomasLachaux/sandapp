require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDb } = require('./database/index');
const errorHandler = require('./utils/errorHandler');

const app = express();
const expressPort = process.env.EXPRESS_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', require('./endpoints/index'));

app.use(errorHandler);

connectDb.once('open', () => {
  app.listen(expressPort, () => {
    console.log(`App listening at http://localhost:${expressPort}`);
  });
});
