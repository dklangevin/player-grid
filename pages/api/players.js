import { getPlayers, getTeams } from '../../nbaApi';
import asyncRetry from '../../utils/promiseRetry';
import sleep from '../../utils/sleep';

export default async function handler(request, response) {
  let teams;
  try {
    teams = await asyncRetry(getTeams);
  } catch {
    console.log('Error: cannot get teams');
    response.status(500).json('Error: cannot get teams');
    return;
  }

  const teamPlayers = [];

  // use for loop instead of Promise.all to limit rate of requests
  for (let { id, name } of teams.slice(0, 4)) {
    const players = await asyncRetry(() => getPlayers(id, name)); // retry request 3 times if fails
    teamPlayers.push({ team: { id, name }, players });
    console.log('Waiting between requests');
    sleep(1000);
  }

  response.status(200).json(teamPlayers);
}
