import useSWR from 'swr';
import api from 'lib/axios';

export default function useTeams({ teamIds, limit }) {
  const { data, mutate, isLoading, error } = useSWR(
    'team-players',
    () => api.teams.list({ teamIds, limit }).catch((e) => console.error(e)),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  return {
    mutate,
    data,
    loading: isLoading,
    error,
  };
}
