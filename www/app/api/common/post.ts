import { apiClient } from '~/api';
import { type AxiosRequestConfig } from 'axios';

type Record = { [key: string]: unknown };

export async function post<T>(
	url: string,
	record: Record | Record[] | FormData,
	config?: AxiosRequestConfig,
) {
	const response = await apiClient.post<T>(url, record, { ...config });

	return response.data;
}
