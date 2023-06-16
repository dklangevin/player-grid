import axios from 'axios';
import { rowMapping } from './utils/helpers';

const api = axios.create({
  baseURL: 'https://stats.nba.com/stats/',
  timeout: 1000,
  headers: {
    Referer: 'https://www.nba.com/',
    Origin: 'https://www.nba.com',
    Accept: '*/*',
  },
});

export async function listTeams() {
  const rows = await api
    .get(
      'leaguestandingsv3?GroupBy=conf&LeagueID=00&Season=2022-23&SeasonType=Regular%20Season&Section=overall'
    )
    .then((res) => {
      const data = res.data.resultSets[0].rowSet;
      const rows = data.map((row) => ({ id: row[2], name: row[4] }));
      console.log('teams fetch success');
      return rows;
    })
    .catch((err) => {
      console.log(err);
      console.log('teams fetch error');
    });
  return rows;
}

export async function listPlayers(teamId) {
  const options = {
    params: {
      Historical: '1',
      LeagueID: '00',
      Season: '2022-23',
      SeasonType: 'Regular Season',
      ...(teamId && { TeamID: teamId }),
    },
    timeout: 9000,
  };

  const [headers, data] = await api
    .get('playerindex', options)
    .then((res) => [
      res.data.resultSets[0].headers,
      res.data.resultSets[0].rowSet,
    ])
    .catch((error) => {
      console.log(error);
    });

  const mapping = {
    id: 'PERSON_ID',
    firstName: 'PLAYER_FIRST_NAME',
    lastName: 'PLAYER_LAST_NAME',
    slug: 'PLAYER_SLUG',
    teamId: 'TEAM_ID',
    position: 'POSITION',
    points: 'PTS',
    assists: 'AST',
    rebounds: 'REB',
  };

  const mappingFunc = rowMapping(mapping, headers);

  const rows = data ? data.map(mappingFunc) : [];

  return rows;
}
