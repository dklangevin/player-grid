import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import PlayerSelector from '../components/PlayerSelector';

// export const getServerSideProps = async () => {
//   const res = await fetch('api/players');

//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

export default function Home() {
  const [data, setData] = useState([]);
  const [playerSelectorOpen, setPlayerSelectorOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await (await fetch('/api/players')).json();
      console.log(res);
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Content>
        <Grid colTeams={data.slice(0, 2)} rowTeams={data.slice(2, 4)} />
        <PlayerSelector />
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

const Player = styled.div`
  padding: 8px;
  display: flex;
  gap: 4px;
`;

const Number = styled.span`
  font-weight: 900;
`;

const Position = styled.span`
  font-weight: 900;
`;

const Content = styled.div`
  display: flex;
  gap: 32px;
  margin: auto;
`;
