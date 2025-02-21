import { useQuery } from '@tanstack/react-query';
import { getStatuses } from '~/api/statuses/calls';
import { CACHE_KEYS } from '~/api';

export const useGetStatusesQuery = () =>
  useQuery({
    queryFn: () => getStatuses(),
    queryKey: [CACHE_KEYS.STATUSES],
  });
