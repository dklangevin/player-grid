import { shuffled } from '@/utils/helpers';
import prisma from 'lib/prisma';

export default async function handler(request, response) {
  const { teamIds, limit = 10 } = request.query;

  const _teamsIds = (
    await prisma.team.findMany({
      select: {
        teamId: true,
      },
    })
  ).map(({ teamId }) => teamId);
  const randomSubsetIds = shuffled(_teamsIds).slice(0, limit);

  const teams = await prisma.team.findMany({
    where: {
      teamId: {
        in: teamIds
          ? teamIds.split(',').map((id) => parseInt(id))
          : randomSubsetIds,
      },
    },
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
