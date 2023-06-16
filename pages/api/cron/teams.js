import prisma from 'lib/prisma';
import { listTeams } from '../../../nbaApi';

export default async function handler(_, response) {
  let rows;
  try {
    rows = await listTeams();
  } catch (error) {
    console.log(error);
    console.log('Error: cannot get teams');
    response.status(500).json('Error: cannot get teams');
    return;
  }

  await prisma.team.deleteMany({});

  const teams = await prisma.team.createMany({
    data: rows.map(({ id: teamId, name }) => ({ teamId, name })),
  });

  response
    .status(200)
    .json(`success -- ${teams.count} teams written to database`);
}
