import { getEnv } from './utils/getEnv';
import { api } from './api/server';

const PORT = getEnv('PORT') || '3000';

api.listen(PORT, () =>
  console.log(`Email register API is listening on port ${PORT}`)
);
