import { apiClient } from '~/api';

type Record = { [key: string]: unknown; id?: number };

export async function put<T>(url: string, record: Record | Record[]) {
  const formattedUrl = Array.isArray(record)
    ? url
    : `${url}/${String(record?.id)}`;
  const response = await apiClient.put<T>(formattedUrl, record);

  return response.data;
}
