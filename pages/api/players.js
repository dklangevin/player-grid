import { Pool } from 'pg';
import _ from 'lodash';

const LIMIT = 10;

export default async function handler(request, response) {
  const pool = new Pool(process.env.dbConfig);
  const client = await pool.connect();

  const query = `SELECT * FROM players`;
  const rows = (await client.query(query)).rows;

  client.release();

  response.status(200).json(rows);
}
