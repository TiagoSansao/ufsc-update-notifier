import { getEnv } from './utils/getEnv';
import { api } from './api/server';
import { logger } from './utils/logger';

const PORT = getEnv('PORT') || '3000';

api.listen(PORT, () =>
  logger.info(`Email register API is listening on port ${PORT}`)
);
