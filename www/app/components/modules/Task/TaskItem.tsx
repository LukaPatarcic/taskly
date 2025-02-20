import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import type { ITask } from '~/api/tasks/calls';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { nameInitials } from '~/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import dayjs from 'dayjs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { TaskFormUpdate } from '~/components/modules/Task/TaskFormUpdate';

interface TaskItemProps {
  task: ITask;
}

export const TaskItem = (props: TaskItemProps) => {
  const { task } = props;
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card key={task.id} className="cursor-pointer" onClick={openModal}>
          <CardHeader>
            <CardTitle className="text-ellipsis whitespace-nowrap overflow-hidden">
              {task.title}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {task.description}
            </CardDescription>
            <CardContent className="p-0 pt-2">
              <div className="flex items-center justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar>
                        <AvatarImage src={task.user.avatar} />
                        <AvatarFallback>
                          {nameInitials(
                            task.user.firstName,
                            task.user.lastName,
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {task.user.firstName} {task.user.lastName}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <time className="text-xs text-muted-foreground">
                  {dayjs(task.createdAt).format('DD MMM YYYY [at] HH:mm')}
                </time>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Let's create your task</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <TaskFormUpdate task={task} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};
