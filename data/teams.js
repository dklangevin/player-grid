import useSWR from 'swr';
import api from 'lib/axios';

export default function useTeams({ teamIds, limit }) {
  const { data, mutate, isLoading, error } = useSWR('team-players', () =>
    api.teams.list({ teamIds, limit }).catch((e) => console.error(e))
  );

  return {
    mutate,
    data,
    loading: isLoading,
    error,
  };
}
