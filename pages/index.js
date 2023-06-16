import Button from 'components/Button';
import HowToPlay from 'components/HowToPlay';
import Options from 'components/NewGame';
import usePlayers from 'data/players';
import useTeams from 'data/teams';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Heart } from 'react-ionicons';
import styled, { css } from 'styled-components';
import useCommonPlayers from '../hooks/commonPlayers';
import { generateSeed } from '../utils/helpers';

const ROW_COUNT = 4;
const COLUMN_COUNT = 4;

export default function Home() {
  const router = useRouter();

  const [howToPlayModalOpen, setHowToPlayModalOpen] = useState(false);
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const [playerSelectorOpen, setPlayerSelectorOpen] = useState(false);

  const [lives, setLives] = useState(3);

  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const [currentI, setCurrentI] = useState(null);
  const [currentJ, setCurrentJ] = useState(null);

  const [search, setSearch] = useState('');
  const [chosenPlayers, setChosenPlayers] = useState(
    Array(ROW_COUNT).fill(Array(COLUMN_COUNT).fill(null))
  );

  const [options, setOptions] = useState({
    rows: ROW_COUNT,
    columns: COLUMN_COUNT,
    showPlayerCount: true,
    showPlayerHeadshots: true,
  });

  useEffect(() => {
    const value = localStorage.getItem('firstVisit');
    setHowToPlayModalOpen(value !== 'false');
  }, []);

  const seed = generateSeed();

  const teamIds = [1610612737, 1610612738, 1610612739];
  const { data: teams, loading: loadingTeams } = useTeams({
    limit: options.rows + options.columns,
  });
  const { data: players, loading: loadingPlayers } = usePlayers();

  // set row, column, and player lists
  const [rowTeams, colTeams] = useMemo(
    () =>
      teams
        ? [
            teams.slice(0, options.rows),
            teams.slice(options.rows, teams.length),
          ]
        : [],
    [teams, options]
  );

  const searchResults = useMemo(() => {
    return players?.filter(({ firstName, lastName }) =>
      `${firstName} ${lastName}`.toLowerCase().includes(search)
    );
  }, [search, players]);

  const isSelected = (i, j) => i === currentI && j === currentJ;

  const commonPlayers = useCommonPlayers(rowTeams, colTeams);

  // useEffect(() => {
  //   if (confirmed) {
  //     setChosenPlayers((prev) =>
  //       prev.map((row, i) =>
  //         row.map((item, j) => {
  //           return item.confirmed && i === currentI && j === currentJ
  //             ? { ...item, confirmed: true }
  //             : item;
  //         })
  //       )
  //     );
  //   }
  // }, [confirmed, setChosenPlayers, currentI, currentJ]);

  const selectPlayer = (player) => {
    if (!chosenPlayers[currentI][currentJ]?.confirmed) {
      setSelectedPlayerId(player.playerId);
      setChosenPlayers((prev) =>
        prev.map((row, i) =>
          row.map((item, j) => {
            return i === currentI && j === currentJ
              ? { ...player, confirmed: false }
              : item;
          })
        )
      );
    }
  };

  const confirmSelection = () => {
    const correct =
      commonPlayers[currentI][currentJ].includes(selectedPlayerId);
    if (!correct) {
      setLives(lives - 1);
    }
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
    setSelectedPlayerId(null);
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

  const cancelSelection = () => {
    setSearch('');
    setPlayerSelectorOpen(false);
    setSelectedPlayerId(null);
    setChosenPlayers((prev) =>
      prev.map((row, i) =>
        row.map((item, j) =>
          i === currentI && j === currentJ && !item?.confirmed ? null : item
        )
      )
    );
  };

  const isSquareDisabled = (i, j) => {
    const item = chosenPlayers[i][j];
    return item?.confirmed;
  };

  const reset = () => {
    setLives(3);
    setSearch('');
    setPlayerSelectorOpen(false);
    setCurrentI(null);
    setCurrentJ(null);
    setChosenPlayers(
      Array(options.rows).fill(Array(options.columns).fill(null))
    );
    setSelectedPlayerId(null);
  };

  const loading = true || loadingTeams || loadingPlayers;

  return (
    <Container>
      {lives === 0 ? (
        <GameOver>
          Game Over!
          <Button
            onClick={() => {
              router.reload();
            }}
          >
            Play Again
          </Button>
        </GameOver>
      ) : (
        <>
          <NewGameButton onClick={() => setOptionsModalOpen(true)}>
            New Game
          </NewGameButton>
          <Lives>
            {[...Array(lives)].map((_, i) => (
              <HeartIcon key={i} color="red" />
            ))}
          </Lives>
          <HelpButton onClick={() => setHowToPlayModalOpen(true)}>
            Help
          </HelpButton>
          {optionsModalOpen && (
            <Options
              close={() => setOptionsModalOpen(false)}
              options={options}
              setOptions={setOptions}
              reset={reset}
            />
          )}
          <Content>
            {loading ? (
              <Loading>Loading...</Loading>
            ) : (
              <Grid>
                {colTeams?.map(({ teamId }, j) => (
                  <Header key={`${teamId}-col-header`} i={1} j={j + 2}>
                    <Logo
                      src={`https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`}
                    />
                  </Header>
                ))}
                {rowTeams?.map(({ teamId }, i) => (
                  <Header key={`${teamId}-row-header`} i={i + 2} j={1}>
                    <Logo
                      src={`https://cdn.nba.com/logos/nba/${teamId}/primary/L/logo.svg`}
                    />
                  </Header>
                ))}
                {rowTeams?.map((_, i) =>
                  colTeams?.map((_, j) => (
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
                          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${chosenPlayers[i][j].playerId}.png`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = 'fallback.webp';
                          }}
                        />
                      ) : (
                        <PlaceholderNumber>
                          {options.showPlayerCount &&
                            commonPlayers[i][j].length}
                        </PlaceholderNumber>
                      )}
                    </Square>
                  ))
                )}
              </Grid>
            )}

            {playerSelectorOpen && (
              <PlayerSelector>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for a player"
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
                          src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = 'fallback.webp';
                          }}
                        />
                      )}
                      {`${player.firstName} ${player.lastName}`}
                    </Player>
                  ))}
                <Buttons>
                  <Button onClick={cancelSelection} appearance="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmSelection}
                    disabled={isSquareDisabled(currentI, currentJ)}
                  >
                    Confirm
                  </Button>
                </Buttons>
              </PlayerSelector>
            )}
          </Content>
        </>
      )}
      {howToPlayModalOpen && (
        <HowToPlay
          close={() => {
            console.log('hi');
            setHowToPlayModalOpen(false);
          }}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewGameButton = styled(Button)`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 140px;
  background-color: #008ad9;
`;

const Lives = styled.div`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const HeartIcon = styled(Heart)``;

const HelpButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 100px;
  background-color: #333333;
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
  overflow: hidden;
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
  grid-row: ${({ i }) => i};
  grid-column: ${({ j }) => j};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  overflow: hidden;
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

const GameOver = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 200px;
  font-size: 24px;
  font-weight: 800;
`;

const Loading = styled.span`
  font-size: 24px;
`;
