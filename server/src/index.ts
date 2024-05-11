import { createApp } from './app';
import { logger } from './lib/logger';
import config from './config';
import connectToDB from './db/connect';

const port = config.app.port;

const app = createApp();
connectToDB().then(() => app.listen(port, () => logger.info(`listening in port: ${port}`))); 