import { apiClient } from '~/api';

export async function get<T>(
  url: string,
  id?: number | string | undefined,
  params?: { [key: string]: string },
) {
  const formattedUrl = id ? `${url}/${id}` : url;
  const response = await apiClient.get<T>(formattedUrl, {
    params,
  });

  return response.data;
}
