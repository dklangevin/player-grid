import prisma from 'lib/prisma';
import { listPlayers, listTeams } from '../../../nbaApi';
import asyncRetry from '../../../utils/promiseRetry';
import sleep from '../../../utils/sleep';

export default async function handler(_, response) {
  let teams;
  try {
    teams = await asyncRetry(listTeams);
  } catch {
    console.log('Error: cannot fetch teams');
    response.status(500).json('Error: cannot fetch teams');
    return;
  }

  let rows = [];

  // use for loop instead of Promise.all to limit rate of requests
  for (const { id: teamId } of teams) {
    const players = await asyncRetry(() => listPlayers(teamId)); // retry request 3 times if fails
    rows = [
      ...rows,
      ...players.map(({ id: playerId, ...player }) => ({
        teamId,
        playerId,
        ...player,
      })),
    ];
    console.log('Waiting between requests...');
    sleep(1000);
  }

  console.log(`Team players fetch success: ${rows.length} rows fetched`);

  await prisma.teamPlayers.deleteMany({});

  let teamPlayers;
  try {
    teamPlayers = await prisma.teamPlayers.createMany({
      data: rows,
    });
  } catch (error) {
    console.log(error);
    console.log('Error: cannot create team players'); // don't log actual error because it is likely too long
    response.status(500).json('Error: cannot create team players');
    return;
  }

  response
    .status(200)
    .json(`success -- ${teamPlayers.count} team players written to database`);
}
