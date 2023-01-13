import { Pool } from 'pg';
import format from 'pg-format';
import { listPlayers, listTeams } from '../../../nbaApi';
import asyncRetry from '../../../utils/promiseRetry';
import sleep from '../../../utils/sleep';

export default async function handler(request, response) {
  let teams;
  try {
    teams = await asyncRetry(listTeams);
  } catch {
    console.log('Error: cannot get teams');
    response.status(500).json('Error: cannot get teams');
    return;
  }

  const rows = [];

  // use for loop instead of Promise.all to limit rate of requests
  for (let { id, name } of teams) {
    const players = await asyncRetry(() => listPlayers(id, name)); // retry request 3 times if fails
    for (let player of players) {
      rows.push({ teamId: id, ...player });
    }
    console.log('Waiting between requests');
    sleep(1000);
  }

  const teamPlayers = rows.map(
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
    `INSERT INTO teamplayers (
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
    teamPlayers
  );

  const pool = new Pool(process.env.dbConfig);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // delete all then insert fresh data
    await client.query('DELETE FROM teamplayers');
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
    .json(`success -- ${teamPlayers.length} team players written to database`);
}
