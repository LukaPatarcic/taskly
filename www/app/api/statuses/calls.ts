import { get } from '~/api';

export interface IStatus {
  id: number;
  label: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export const getStatuses = () => get<IStatus[]>('/statuses');
