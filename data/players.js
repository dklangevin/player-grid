import useSWR from 'swr';
import api from 'lib/axios';

export default function usePlayers() {
  const { data, mutate, isLoading, error } = useSWR('players', () =>
    api.players.list().catch((e) => console.error(e))
  );

  return {
    mutate,
    data,
    loading: isLoading,
    error,
  };
}
