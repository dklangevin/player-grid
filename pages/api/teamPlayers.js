import { Pool } from 'pg';
import _ from 'lodash';

const LIMIT = 10;

export default async function handler(request, response) {
  const pool = new Pool(process.env.dbConfig);
  const client = await pool.connect();

  // get random list of teams
  const teamsQuery = `SELECT * FROM teams ORDER BY RANDOM() LIMIT ${LIMIT}`;
  const teamsRows = (await client.query(teamsQuery)).rows;
  const teamIds = teamsRows.map(({ id }) => id);

  // select players from only those teams
  const playersQuery = `SELECT * FROM teamplayers WHERE teamid IN (${teamIds.join(
    ','
  )})`;
  const playersRows = (await client.query(playersQuery)).rows;

  client.release();

  const groupedPlayers = _.groupBy(playersRows, (player) => player.teamid);

  const teams = teamsRows.map(({ id, name }) => ({
    id,
    name,
    players: groupedPlayers[id],
  }));

  response.status(200).json(teams);
}
