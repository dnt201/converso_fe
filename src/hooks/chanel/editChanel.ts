import { mutationPost, mutationPut } from '@config/api';
import { apiPath } from '@config/api/path';
import { IResponse } from '@interfaces/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { iChanel } from './myListChanel';
import { PickSingle } from '@hooks/customHooks';
export type tEditChanel = {};
type tLoginResponse = IResponse<tEditChanel>;
// export type tLoginParams = {
//    username: string;
//    password: string;
// };

export const useEditChanel = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (chanel: iChanel) => {
         if (chanel.channelTypeId == 2) {
            chanel.credentials = {
               PageToken: chanel?.PageToken,
               WebhookSecret: chanel.WebhookSecret,
            };
         }
         if (chanel.channelTypeId == 3) {
            chanel.credentials = {
               LineToken: chanel?.LineToken,
            };
         }
         return mutationPost<tLoginResponse>({
            url: `${apiPath.CHANEL.EDIT_BY_ID.replace('{id}', chanel.id.toString())}`,
            body: chanel,
         });
      },
      onSuccess: (success) => {
         notification.success({ message: success.message || 'Edit chanel success!' });

         return queryClient.invalidateQueries({
            queryKey: ['my-list-chanel'],
         });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message,
         });
      },
   });
};

export const useDeleteChannel = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (id: any) => {
         console.log(id);
         return mutationPost<tLoginResponse>({
            url: `${apiPath.CHANEL.DELETE_BY_ID.replace('{id}', id.toString())}`,
            body: {},
         });
      },
      onSuccess: (success) => {
         notification.success({ message: success.message || 'Delete chanel success!' });

         return queryClient.invalidateQueries({
            queryKey: ['my-list-chanel'],
         });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message,
         });
      },
   });
};
