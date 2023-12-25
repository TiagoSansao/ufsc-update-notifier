import dotenv from 'dotenv';

dotenv.config({ path: 'config/.env' });

function getEnv(key: string): string | undefined {
  const value = process.env[key];

  console.warn(`${key} environment variable is not set!`);

  return value;
}

export { getEnv };
