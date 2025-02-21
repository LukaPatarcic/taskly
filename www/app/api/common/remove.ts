import { apiClient } from '~/api';

export async function remove<T = void>(url: string, id?: string | number) {
  const fullUrl = id ? `${url}/${id}` : url;
  const response = await apiClient.delete<T>(fullUrl);

  return response.data;
}
