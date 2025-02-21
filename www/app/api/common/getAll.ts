import { apiClient } from '~/api';

export async function getAll<T>(url: string) {
  const response = await apiClient.get<T>(url);

  return response.data;
}
