import { Pool } from 'pg';
import format from 'pg-format';
import { listTeams } from '../../../nbaApi';

export default async function handler(request, response) {
  let rows;
  try {
    rows = await listTeams();
  } catch (error) {
    console.log(error);
    console.log('Error: cannot get players');
    response.status(500).json('Error: cannot get players');
    return;
  }

  const teams = rows.map(({ id, name }) => [id, name]);
  const query = format(
    'INSERT INTO teams (id, name) VALUES %L returning id',
    teams
  );

  const pool = new Pool(process.env.dbConfig);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // delete all then insert fresh data
    await client.query('DELETE FROM teams');
    await client.query(query);

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }

  response
    .status(200)
    .json(`success -- ${teams.length} teams written to database`);
}
