require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const routes = require('./endpoints/index');
const { connectDb } = require('./database/index');
const errorHandler = require('./utils/errorHandler');
const sendTask = require('./utils/rabbitmq/sendTask');
const receiveTask = require('./utils/rabbitmq/receiveTask');
const orderHandler = require('./utils/orderHandler');

const app = express();
const expressPort = process.env.EXPRESS_PORT || 3000;
const connectionUrl = process.env.RABBITMQ_URL || 'amqp://localhost';

const swaggerDocument = YAML.load(`${__dirname}/../openapi.yaml`);

app.use(cors());
app.use(express.json());

app.use(morgan('tiny'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.use(errorHandler);

(async () => {
  await new Promise((resolve, reject) => {
    connectDb.once('open', resolve);
    connectDb.on('error', reject);
  });
  await sendTask.startPublisher(connectionUrl);
  await receiveTask.startConsumer(connectionUrl, 'return-orders', orderHandler.receiveFromQueue);
  app.listen(expressPort, () => {
    console.log(`App listening at http://localhost:${expressPort}`);
  });
})().catch(console.error);
