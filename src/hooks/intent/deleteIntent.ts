import { mutationDelete, mutationPost } from '@config/api';
import { apiPath } from '@config/api/path';
import { IResponse } from '@interfaces/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

export const useDeleteIntent = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (id: any) => {
         return mutationPost<IResponse<any>>({
            url: `${apiPath.INTENT.DELETE.replace('{id}', id)}`,
            body: {},
         });
      },
      onSuccess: (success) => {
         notification.success({ message: success.message || 'Delete training success!' });

         return queryClient.invalidateQueries({
            queryKey: ['my-list-intent'],
         });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message || 'Delete failed!',
         });
      },
   });
};
