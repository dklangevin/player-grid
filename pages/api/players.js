import prisma from 'lib/prisma';

export default async function handler(request, response) {
  const players = await prisma.player.findMany({
    select: {
      id: true,
      playerId: true,
      firstName: true,
      lastName: true,
    },
  });

  response.status(200).json(players);
}
