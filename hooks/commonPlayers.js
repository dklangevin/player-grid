import { useMemo } from 'react';
import { commonPlayers } from '../utils/helpers';

export default function useCommonPlayers(rowTeams, colTeams) {
  return useMemo(() => {
    const [m, n] = [rowTeams?.length, colTeams?.length];
    if (!m || !n) {
      return null;
    }
    console.log('computing common players...');
    return rowTeams.map((_, i) =>
      colTeams.map((_, j) =>
        commonPlayers(rowTeams[i].team.id, colTeams[j].team.id, [
          ...rowTeams,
          ...colTeams,
        ])
      )
    );
  }, [rowTeams, colTeams]);
}
