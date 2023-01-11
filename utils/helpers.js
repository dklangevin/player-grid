export const intersection = (arrayA, arrayB) =>
  arrayA.filter((value) => arrayB.includes(value));

export const commonPlayers = (teamIdA, teamIdB, teamPlayers) => {
  const teamPlayersA = teamPlayers
    .find((team) => team.team.id === teamIdA)
    ?.players.map(({ id }) => id);
  const teamPlayersB = teamPlayers
    .find((team) => team.team.id === teamIdB)
    ?.players.map(({ id }) => id);
  return !teamPlayersA?.length || !teamPlayersB?.length
    ? []
    : intersection(teamPlayersA, teamPlayersB);
};
