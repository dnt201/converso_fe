import { IMutationPost } from '@interfaces/mutation.interfaces';
import apiClient from './apiClient';

export async function getData<T>(url: string) {
   return await apiClient.get(url).then((res: { data: T }) => {
      return res.data;
   });
}

export async function getDataWithParams<T, P>(url: string, params: P) {
   return await apiClient.get(url, { params }).then((res: { data: T }) => {
      return res.data;
   });
}

export async function mutationPost<T>(obj: IMutationPost<object>): Promise<T> {
   const { url, body } = obj;
   return await apiClient.post(url, { ...body }).then((response) => response.data as T);
}
export async function mutationDelete<T>(params: IMutationPost<object>): Promise<T> {
   const response = await apiClient.delete(params.url);
   return response.data as T;
}
export async function mutationPut<T>(params: IMutationPost<object>): Promise<T> {
   const response = await apiClient.put(params.url, params.body, { data: params.body });
   return response.data as T;
}
export async function mutationPatch<T>(params: IMutationPost<object>): Promise<T> {
   const response = await apiClient.patch(params.url, params.body);
   return response.data as T;
}
