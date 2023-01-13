import { Pool } from 'pg';
import _ from 'lodash';

export default async function handler(request, response) {
  const pool = new Pool(process.env.dbConfig);
  const client = await pool.connect();

  const teamsQuery = `SELECT * FROM teams`;
  const teamsRows = (await client.query(teamsQuery)).rows;

  const playersQuery = `SELECT * FROM teamplayers`;
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
