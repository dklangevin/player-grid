import styled from 'styled-components';

export default function PlayerSelector() {
  const players = ['Nikola Jokic', 'Bam Adabeyo', 'Lebron James'];
  return (
    <Container>
      <Search />
      {players.map((player, i) => (
        <Player key={i}>
          <Headshot
            src={'https://cdn.nba.com/headshots/nba/latest/1040x760/203500.png'}
          />
          {player}
        </Player>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
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
  border-radius: 4px;
  border: 1px solid grey;
  appearance: none;
`;

const Player = styled.div`
  background: #222222;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Headshot = styled.img`
  height: 50px;
  object-fit: contain;
`;
