const axios = require('axios');

export default async function handler(request, response) {
  const options = {
    method: 'GET',
    // url: 'https://stats.nba.com/stats/leaguestandingsv3',
    url: 'https://stats.nba.com/stats/leaguestandingsv3?GroupBy=conf&LeagueID=00&Season=2022-23&SeasonType=Regular%20Season&Section=overall',
    // params: {
    //   LeagueID: '00',
    //   //   SeasonYear: '2022-23',
    //   SeasonType: 'Regular Season',
    //   Section: 'overall',
    //   GroupBy: 'conf',
    // },
    headers: {
      referer: 'https://www.nba.com',
    },
  };

  const data = await axios
    .request(options)
    .then((res) => res.data.resultSets[0].rowSet)
    // .then((res) => res.data)
    .catch((error) => {
      console.log('could not get teams: timeout exceeded');
      return 'could not get teams: timeout exceeded';
    });

  const rows = data.map((row) => ({ id: row[2], name: row[4] }));

  response.status(200).json(rows);
}
