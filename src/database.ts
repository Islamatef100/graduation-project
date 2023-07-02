import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

console.log(ENV);

const client = new Pool({
  host: POSTGRES_HOST,
  database: ENV == 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
});

export default client;
