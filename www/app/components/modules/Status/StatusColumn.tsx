import { TaskItem } from '~/components/modules/Task/TaskItem';
import type { ITask } from '~/api/tasks/calls';

interface StatusColumnProps {
  status: string;
  tasks: ITask[];
}

export const StatusColumn = (props: StatusColumnProps) => {
  const { status, tasks } = props;
  return (
    <div key={status} className="w-100 bg-accent relative flex flex-col">
      <div className="sticky top-0 p-3 bg-accent border-b-1 z-10">
        <div>{status}</div>
      </div>
      <div className="space-y-4 bg-accent py-4 px-4 grow-1">
        {tasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </div>
    </div>
  );
};
