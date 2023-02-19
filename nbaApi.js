import axios from 'axios';
import { rowMapping } from './utils/helpers';

const api = axios.create({
  baseURL: 'https://stats.nba.com/stats/',
  timeout: 20000,
  headers: {
    Referer: 'https://www.nba.com',
    Origin: 'https://www.nba.com',
    'User-Agent': 'PostmanRuntime/7.28.4',
    Accept: '*/*',
    Host: 'stats.nba.com',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
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
      return rows;
    });
  return rows;
}

export async function listTeamPlayers(teamId, historical = false) {
  const options = {
    params: {
      Historical: historical ? '1' : '0',
      LeagueID: '00',
      Season: '2022-23',
      SeasonType: 'Regular Season',
      TeamID: teamId,
    },
    timeout: 5000,
  };

  const data = await api
    .get('playerindex', options)
    .then((res) => res.data.resultSets[0].rowSet)
    .catch((error) => {
      console.log(error);
    });

  const rows = data
    ? data.map((row) => ({
        id: row[0],
        name: `${row[2]} ${row[1]}`,
        number: row[9],
        position: row[10],
      }))
    : [];

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
