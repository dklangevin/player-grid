import prisma from 'lib/prisma';

export default async function handler(request, response) {
  const { teamIds, limit = 10 } = request.query;
  const teams = await prisma.team.findMany({
    ...(teamIds
      ? {
          where: {
            id: {
              in: teamIds.split(',').map((id) => parseInt(id)),
            },
          },
        }
      : { take: parseInt(limit) }),
    select: {
      id: true,
      teamId: true,
      teamPlayers: {
        select: {
          playerId: true,
        },
      },
    },
  });

  response.status(200).json(teams);
}
