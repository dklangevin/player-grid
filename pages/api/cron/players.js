import prisma from 'lib/prisma';
import { listPlayers } from '../../../nbaApi';

export default async function handler(request, response) {
  let rows;
  try {
    rows = await listPlayers();
  } catch (error) {
    console.log(error);
    console.log('Error: cannot fetch players');
    response.status(500).json('Error: cannot fetch players');
    return;
  }

  console.log(`Players fetch success: ${rows.length} rows fetched`);

  await prisma.player.deleteMany({});

  let players;
  try {
    players = await prisma.player.createMany({
      data: rows.map(({ id: playerId, teamId, ...player }) => ({
        playerId,
        ...player,
      })),
    });
  } catch (error) {
    console.log(error);
    console.log('Error: cannot create players'); // don't log actual error because it is likely too long
    response.status(500).json('Error: cannot create players');
    return;
  }

  response
    .status(200)
    .json(`success -- ${players.count} player written to database`);
}
