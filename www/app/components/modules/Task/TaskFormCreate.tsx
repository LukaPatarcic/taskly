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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTaskMutation } from '~/api/tasks/mutations';
import { Loader2 } from 'lucide-react';
import { useToast } from '~/hooks/use-toast';
import { StatusSelect } from '~/components/modules/Status/StatusSelect';
import { UserSelect } from '~/components/modules/User/UserSelect';
import { FORM_CLOSE_TIMEOUT } from '~/constants/constants';

interface TaskFormProps {
  closeModal?: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, 'Please enter a title'),
  description: z.string().min(1, 'Please enter a description'),
  statusId: z.string().min(1, 'Please select a status'),
  userId: z.string().min(1, 'Please select a user'),
});

export const TaskFormCreate = (props: TaskFormProps) => {
  const { closeModal } = props;
  const { toast } = useToast();
  const { mutateAsync, isPending } = useCreateTaskMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      statusId: '',
      userId: '',
    },
  });

  const onSubmit = (task: z.infer<typeof formSchema>) => {
    mutateAsync({ ...task, statusId: +task.statusId, userId: +task.userId })
      .then(() => {
        toast({
          title: `Task created`,
          description: `Your task has been created successfully`,
        });
        form.reset();
        setTimeout(() => {
          closeModal?.();
        }, FORM_CLOSE_TIMEOUT);
      })
      .catch(() => {
        toast({
          title: 'An error occurred',
          description: `An error occurred while creating your task`,
        });
      });
  };

  return (
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
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
