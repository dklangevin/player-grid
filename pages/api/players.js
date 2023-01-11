import { getPlayers, getTeams } from '../../nbaApi';
import asyncRetry from '../../utils/promiseRetry';
import sleep from '../../utils/sleep';

export default async function handler(request, response) {
  const { count } = request.query;

  if (!count) {
    response.status(200).json(teamPlayers);
    return;
  }

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
  for (let { id, name } of teams.slice(0, count)) {
    const players = await asyncRetry(() => getPlayers(id, name)); // retry request 3 times if fails
    teamPlayers.push({ team: { id, name }, players });
    console.log('Waiting between requests');
    sleep(1000);
  }

  response.status(200).json(teamPlayers);
}
