import styled from 'styled-components';

export default function Grid({ colTeams, rowTeams }) {
  return (
    <Container>
      {colTeams.map(({ team: { id, name } }, j) => (
        <Header key={`${id}-col-header`} i={1} j={j + 2}>
          <Logo
            src={`https://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg`}
          />
        </Header>
      ))}
      {rowTeams.map(({ team: { id, name } }, i) => (
        <Header key={`${id}-row-header`} i={i + 2} j={1}>
          <Logo
            src={`https://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg`}
          />
        </Header>
      ))}
      {colTeams.map((_, i) =>
        rowTeams.map((_, j) => <Square key={`${i}${j}`} i={i + 2} j={j + 2} />)
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  gap: 4px;
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
  /* background: hsl(${Math.random() * 360} 80 50); */
  background: #333333;
  grid-row: ${({ i }) => i};
  grid-column: ${({ j }) => j};
  border-radius: 8px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin: auto;
`;
