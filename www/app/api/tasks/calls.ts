import { get, remove, post } from '~/api';
import type { IUser } from '~/api/users/calls';
import type { IStatus } from '~/api/statuses/calls';
import { put } from '~/api/common/put';

export interface ITask {
  id: number;
  title: string;
  description: string;
  statusId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  status: IStatus;
  user: IUser;
}

export type ITaskGrouped = {
  [key: string]: ITask[];
};

export type ITaskCreate = Omit<
  ITask,
  'id' | 'status' | 'user' | 'createdAt' | 'updatedAt'
>;
export type ITaskUpdate = Omit<
  ITask,
  'status' | 'user' | 'createdAt' | 'updatedAt'
>;

export const getTasks = async () => {
  const data = await get<ITaskGrouped>('/tasks');
  const array = Object.entries(data);

  return array;
};
export const getTask = (id: number | string) => get<ITask>(`/tasks`, id);
export const createTask = (data: ITaskCreate) => post<ITask>('/tasks', data);
export const updateTask = (data: ITaskUpdate) => put<void>(`/tasks`, data);
export const deleteTask = (id: number | string) => remove<void>(`/tasks`, id);
