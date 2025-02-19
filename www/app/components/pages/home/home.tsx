import {TaskForm} from "~/components/TaskForm";
import {useGetTasks} from "~/api/tasks/query";
import {Card, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Skeleton} from "~/components/ui/skeleton";

export function HomePage() {
    const { isLoading, data } = useGetTasks();
  return (
    <main className="max-h-dvh">
        <div className="px-12 py-8 space-y-8 h-full">
            <TaskForm />
            {isLoading && (
                <div className="flex space-x-4 h-170">
                    <Skeleton className="w-100 h-full" />
                    <Skeleton className="w-100 h-full" />
                    <Skeleton className="w-100 h-full" />
                </div>
            )}
            <div className="flex space-x-4">
                {data && data.map(([status, tasks]) => (
                    <div key={status} className="w-100 bg-accent relative flex flex-col">
                        <div className="sticky top-0 p-3 bg-accent border-b-1">
                            <div>{status}</div>
                        </div>
                        <div className="space-y-4 bg-accent py-4 px-4 grow-1">
                            {tasks?.map((task) => (
                                <Card key={task.id} className="cursor-pointer">
                                    <CardHeader>
                                        <CardTitle>{task.title}</CardTitle>
                                        <CardDescription>{task.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
  );
}
