import { useQuery } from '@tanstack/react-query';
import { getTasks } from '~/api/tasks/calls';
import { CACHE_KEYS } from '~/api';

export const useGetTasks = () =>
  useQuery({
    queryFn: () => getTasks(),
    queryKey: [CACHE_KEYS.TASKS],
  });
