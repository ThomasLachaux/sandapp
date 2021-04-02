require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { connectDb } = require('./database/index');
const routes = require('./endpoints/index');
const errorHandler = require('./utils/errorHandler');

const app = express();
const expressPort = process.env.EXPRESS_PORT || 3000;

const swaggerDocument = YAML.load(`${__dirname}/../openapi.yaml`);

app.use(cors());
app.use(express.json());

app.use(morgan('tiny'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.use(errorHandler);

connectDb.once('open', () => {
  app.listen(expressPort, () => {
    console.log(`App listening at http://localhost:${expressPort}`);
  });
});
