import { type DefaultError, useMutation } from '@tanstack/react-query';
import { queryClient } from '~/root';
import { CACHE_KEYS } from '~/api';
import {
  createTask,
  deleteTask,
  type ITask,
  type ITaskCreate,
  type ITaskUpdate,
  updateTask,
} from '~/api/tasks/calls';

export const useCreateTaskMutation = () =>
  useMutation<ITask, DefaultError, ITaskCreate>({
    mutationFn: createTask,
    mutationKey: [CACHE_KEYS.TASKS],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.TASKS] });
    },
  });

export const useUpdateTaskMutation = () =>
  useMutation<void, DefaultError, ITaskUpdate>({
    mutationFn: updateTask,
    mutationKey: [CACHE_KEYS.TASKS],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.TASKS] });
    },
  });

export const useDeleteTaskMutation = () =>
  useMutation<void, DefaultError, number>({
    mutationFn: deleteTask,
    mutationKey: [CACHE_KEYS.TASKS],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.TASKS] });
    },
  });
