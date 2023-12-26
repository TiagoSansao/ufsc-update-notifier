import dotenv from 'dotenv';
import { MissingEnvVar } from '../errors/missingEnvVar';

const ENV_PATH = 'config/.env';
dotenv.config({ path: ENV_PATH });

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) throw new MissingEnvVar(key, ENV_PATH);

  return value;
}

export { getEnv };
