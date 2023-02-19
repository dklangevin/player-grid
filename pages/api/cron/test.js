import { Pool } from 'pg';
import format from 'pg-format';
import { listTeam } from '../../../nbaApi';

export default async function handler(request, response) {
  let rows;
  try {
    rows = await listTeam();
  } catch (error) {
    response.status(500).json(error);
    return;
  }

  response.status(200).json(rows);
}
