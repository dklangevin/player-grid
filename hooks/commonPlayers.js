import { useMemo } from 'react';
import { intersection } from '../utils/helpers';

export default function useCommonPlayers(rowTeams, colTeams) {
  return useMemo(() => {
    return rowTeams?.map((_, i) =>
      colTeams?.map((_, j) =>
        intersection(
          rowTeams[i].teamPlayers.map(({ playerId }) => playerId),
          colTeams[j].teamPlayers.map(({ playerId }) => playerId)
        )
      )
    );
  }, [rowTeams, colTeams]);
}
