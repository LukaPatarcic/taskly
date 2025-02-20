'use client';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetStatusesQuery } from '~/api/statuses/query';
import { useGetUsersQuery } from '~/api/users/query';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '~/api/tasks/mutations';
import { Loader2 } from 'lucide-react';
import { useToast } from '~/hooks/use-toast';
import type { ITask } from '~/api/tasks/calls';
import { Trash2 } from 'lucide-react';
import { UserSelect } from '~/components/modules/User/UserSelect';
import { StatusSelect } from '../Status/StatusSelect';
import { FORM_CLOSE_TIMEOUT } from '~/constants/constants';

interface TaskFormProps {
  closeModal?: () => void;
  task: ITask;
}

const formSchema = z.object({
  title: z.string().min(1, 'Please enter a title'),
  description: z.string().min(1, 'Please enter a description'),
  statusId: z.string().min(1, 'Please select a status'),
  userId: z.string().min(1, 'Please select a user'),
});

export const TaskFormUpdate = (props: TaskFormProps) => {
  const { task } = props;
  const { closeModal } = props;
  const { toast } = useToast();
  const methods = useForm();
  const { isPending: isPendingDelete, mutateAsync: deleteTaskAsync } =
    useDeleteTaskMutation();
  const { mutateAsync: updateTaskAsync, isPending: isPendingUpdate } =
    useUpdateTaskMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...task,
      userId: task?.userId.toString(),
      statusId: task?.statusId.toString(),
    },
  });

  const onDelete = () => {
    if (!task) {
      return;
    }
    deleteTaskAsync(task.id)
      .then(() => {
        toast({
          title: 'Task deleted',
          description: 'Your task has been deleted successfully',
        });
        setTimeout(() => {
          closeModal?.();
        }, FORM_CLOSE_TIMEOUT);
      })
      .catch(() => {
        toast({
          title: 'An error occurred',
          description: 'An error occurred while deleting your task',
        });
      });
  };

  const onSubmit = (_task: z.infer<typeof formSchema>) => {
    const param = {
      id: task.id,
      ..._task,
      statusId: +_task.statusId,
      userId: +_task.userId,
    };
    updateTaskAsync(param)
      .then(() => {
        toast({
          title: `Task updated`,
          description: `Your task has been updated successfully`,
        });
        setTimeout(() => {
          closeModal?.();
        }, FORM_CLOSE_TIMEOUT);
      })
      .catch(() => {
        toast({
          title: 'An error occurred',
          description: `An error occurred while updating your task`,
        });
      });
  };

  return (
    <FormProvider {...methods}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter you title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter you description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <StatusSelect />
          <UserSelect />
          <Button
            className="w-full mb-2"
            variant="destructive"
            type="button"
            onClick={onDelete}
            disabled={isPendingDelete}
          >
            {isPendingDelete && <Loader2 className="animate-spin" />}
            Delete <Trash2 />
          </Button>
          <Button className="w-full" type="submit" disabled={isPendingUpdate}>
            {isPendingUpdate && <Loader2 className="animate-spin" />}
            Update
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};
