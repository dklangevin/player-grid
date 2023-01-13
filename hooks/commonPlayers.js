import { useMemo } from 'react';
import { commonPlayers, intersection } from '../utils/helpers';

export default function useCommonPlayers(rowTeams, colTeams) {
  return useMemo(() => {
    const [m, n] = [rowTeams?.length, colTeams?.length];
    if (!m || !n) {
      return null;
    }
    return rowTeams.map((_, i) =>
      colTeams.map((_, j) =>
        intersection(
          rowTeams[i].players.map(({ id }) => id),
          colTeams[j].players.map(({ id }) => id)
        )
      )
    );
  }, [rowTeams, colTeams]);
}
