import { Pool } from 'pg';
import format from 'pg-format';
import { listPlayers } from '../../../nbaApi';

export default async function handler(request, response) {
  let rows;
  try {
    rows = await listPlayers();
  } catch (error) {
    console.log(error);
    console.log('Error: cannot get players');
    response.status(500).json('Error: cannot get players');
    return;
  }

  const players = rows.map(
    ({
      id,
      firstName,
      lastName,
      slug,
      teamId,
      position,
      points,
      assists,
      rebounds,
    }) => [
      id,
      firstName,
      lastName,
      slug,
      teamId,
      position,
      points,
      assists,
      rebounds,
    ]
  );

  const query = format(
    `INSERT INTO players (
      id, 
      firstName, 
      lastName, 
      slug, 
      teamId, 
      position, 
      points, 
      assists, 
      rebounds
    ) VALUES %L`,
    players
  );

  const pool = new Pool(process.env.dbConfig);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // delete all then insert fresh data
    await client.query('DELETE FROM players');
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
    .json(`success -- ${players.length} player written to database`);
}
