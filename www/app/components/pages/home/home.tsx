import { TaskFormModal } from '~/components/modules/Task/TaskFormModal';
import { useGetTasks } from '~/api/tasks/query';
import { StatusColumn } from '~/components/modules/Status/StatusColumn';
import { TaskSkeletonLoader } from '~/components/modules/Task/TaskSkeletonLoader';

export function HomePage() {
  const { isLoading, data } = useGetTasks();
  return (
    <main className="max-h-dvh">
      <div className="px-12 py-8 space-y-8 h-full">
        <TaskFormModal />
        {isLoading && <TaskSkeletonLoader />}
        <div className="h-170 max-h-200 overflow-scroll">
          <div className="flex space-x-4">
            {data?.map(([status, tasks]) => (
              <StatusColumn key={status} status={status} tasks={tasks} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
