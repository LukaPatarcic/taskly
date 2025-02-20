import { Skeleton } from '~/components/ui/skeleton';

export const TaskSkeletonLoader = () => {
  return (
    <div className="flex space-x-4 h-170">
      <Skeleton className="w-100 h-full" />
      <Skeleton className="w-100 h-full" />
      <Skeleton className="w-100 h-full" />
    </div>
  );
};
