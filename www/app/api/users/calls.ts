import { get } from '~/api';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export const getUsers = () => get<IUser[]>('/users');
