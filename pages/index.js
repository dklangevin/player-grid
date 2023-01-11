import styled, { css } from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import Button from '../components/Button';
import { intersection } from '../utils/helpers';
import useCommonPlayers from '../hooks/commonPlayers';
import Options from '../components/Options';

// export const getServerSideProps = async () => {
//   const res = await fetch('api/players');

//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

const rowCount = 5;
const colCount = 5;
const squareCount = rowCount * colCount;
const teamCount = rowCount + colCount;

export default function Home() {
  const [data, setData] = useState([]);
  const [playerSelectorOpen, setPlayerSelectorOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [currentI, setCurrentI] = useState();
  const [currentJ, setCurrentJ] = useState();
  const [search, setSearch] = useState('');
  const [chosenPlayers, setChosenPlayers] = useState(
    Array(rowCount).fill(Array(colCount).fill(null))
  );
  const [options, setOptions] = useState({
    rows: 4,
    columns: 4,
    showPlayerCount: true,
    showPlayerHeadshots: true,
  });

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await (await fetch(`/api/players?count=${teamCount}`)).json();
      setData(res);
    };
    fetchData();
  }, []);

  // set row, column, and player lists
  const [rowTeams, colTeams, allPlayers] = useMemo(
    () =>
      data
        ? [
            data.slice(0, options.rows),
            data.slice(
              options.rows,
              data.length - options.rows - options.columns > 0
                ? -(data.length - options.rows - options.columns)
                : data.length
            ),
            data.map((team) => team.players).flat(),
          ]
        : [],
    [data, options]
  );

  const searchResults = useMemo(() => {
    return allPlayers.filter((player) =>
      player.name.toLowerCase().includes(search)
    );
  }, [search, allPlayers]);

  const isSelected = (i, j) => i === currentI && j === currentJ;

  const commonPlayers = useCommonPlayers(rowTeams, colTeams);

  useEffect(() => {
    if (confirmed) {
      setChosenPlayers((prev) =>
        prev.map((row, i) =>
          row.map((item, j) => {
            return item.confirmed && i === currentI && j === currentJ
              ? { ...item, confirmed: true }
              : item;
          })
        )
      );
    }
  }, [confirmed, setChosenPlayers, currentI, currentJ]);

  const selectPlayer = (player) => {
    setSelectedPlayerId(player.id);
    setChosenPlayers((prev) =>
      prev.map((row, i) =>
        row.map((item, j) => {
          return i === currentI && j === currentJ
            ? { ...player, confirmed: false }
            : item;
        })
      )
    );
  };

  const confirmSelection = () => {
    const correct =
      commonPlayers[currentI][currentJ].includes(selectedPlayerId);
    setSelectedPlayerId(null);
    setChosenPlayers((prev) =>
      prev.map((row, i) =>
        row.map((item, j) => {
          return i === currentI && j === currentJ
            ? { ...item, confirmed: true, correct }
            : item;
        })
      )
    );
  };

  const setSelected = (i, j) => {
    setPlayerSelectorOpen(true);
    setChosenPlayers((prev) =>
      prev.map((row, _i) =>
        row.map((item, _j) => {
          return (_i === i && _j === j) || item?.confirmed ? item : null;
        })
      )
    );
    setCurrentI(i);
    setCurrentJ(j);
  };

  return (
    <Container>
      <Options options={options} setOptions={setOptions} />
      <Content>
        <Grid>
          {colTeams.map(({ team: { id } }, j) => (
            <Header key={`${id}-col-header`} i={1} j={j + 2}>
              <Logo
                src={`https://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg`}
              />
            </Header>
          ))}
          {rowTeams.map(({ team: { id } }, i) => (
            <Header key={`${id}-row-header`} i={i + 2} j={1}>
              <Logo
                src={`https://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg`}
              />
            </Header>
          ))}
          {rowTeams.map((_, i) =>
            colTeams.map((_, j) => (
              <Square
                key={`${i}${j}`}
                i={i + 2}
                j={j + 2}
                selected={isSelected(i, j)}
                confirmed={chosenPlayers[i][j]?.confirmed}
                correct={chosenPlayers[i][j]?.correct}
                onClick={() => setSelected(i, j)}
              >
                {chosenPlayers[i][j] ? (
                  <SquareHeadshot
                    src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${chosenPlayers[i][j].id}.png`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = 'fallback.webp';
                    }}
                  />
                ) : (
                  <PlaceholderNumber>
                    {options.showPlayerCount && commonPlayers[i][j].length}
                  </PlaceholderNumber>
                )}
              </Square>
            ))
          )}
        </Grid>
        {playerSelectorOpen && (
          <PlayerSelector>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search for a player'
            />
            {search &&
              searchResults.slice(0, 5).map((player, i) => (
                <Player
                  key={i}
                  onClick={() => selectPlayer(player)}
                  selected={player.id === selectedPlayerId}
                >
                  {options.showPlayerHeadshots && (
                    <Headshot
                      src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = 'fallback.webp';
                      }}
                    />
                  )}
                  {player.name}
                  <Number>{player.number}</Number>
                </Player>
              ))}
            <Buttons>
              <Button
                onClick={() => setSelectedPlayer(null)}
                appearance='secondary'
              >
                Cancel
              </Button>
              <Button onClick={confirmSelection}>Confirm</Button>
            </Buttons>
          </PlayerSelector>
        )}
      </Content>
      {/* <Teams>
          {data?.map(({ team, players }) => (
            <Team key={team}>
              <TeamName>{team}</TeamName>
              {players.map(({ id, name, number, position }) => (
                <Player key={id}>
                  <Number>{number}</Number>
                  {name}
                  <Position>{position}</Position>
                </Player>
              ))}
            </Team>
          ))}
        </Teams> */}
    </Container>
  );
  // return <Container></Container>;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Teams = styled.div`
  display: flex;
  background: #333333;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeamName = styled.div`
  background: #555555;
  padding: 8px;
  font-weight: 800;
`;

const Position = styled.span`
  font-weight: 900;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  margin: auto;
`;

const PlayerSelector = styled.div`
  width: 400px;
  min-height: 100%;
  background: #333333;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Search = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid grey;
  appearance: none;
`;

const Player = styled.div`
  height: 60px;
  background: #222222;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      border: 1px solid white;
    `}

  :hover {
    background: #282828;
  }
`;

const Headshot = styled.img`
  width: 60px;
  object-fit: contain;
`;

const SquareHeadshot = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  margin: auto auto 0 auto;
`;

const Number = styled.span`
  font-size: 20px;
  font-weight: 800;
  margin: 0 8px 0 auto;
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

const Grid = styled.div`
  display: grid;
  gap: 4px;
  width: fit-content;
  height: fit-content;
`;

const Header = styled.div`
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: #666666;
  grid-row: ${({ i }) => i};
  grid-column: ${({ j }) => j};
  border-radius: 8px;
  display: flex;
`;

const Square = styled.div`
  width: 100px;
  height: 100px;
  background: ${({ selected }) => (selected ? '#005c99' : '#333333')};
  ${({ correct, confirmed }) =>
    confirmed &&
    (correct
      ? css`
          background: #448844;
        `
      : css`
          background: #884444;
        `)};
  /* background: #333333;
  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid white;
    `} */
  grid-row: ${({ i }) => i};
  grid-column: ${({ j }) => j};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin: auto;
`;

const PlaceholderNumber = styled.span`
  font-size: 44px;
  font-weight: 900;
  color: #777777bb;
  margin: auto;
`;
