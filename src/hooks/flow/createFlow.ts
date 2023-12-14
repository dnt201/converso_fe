import { mutationPost } from '@config/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IResponse } from '@interfaces/index';
import { apiPath } from '@config/api/path';
import { notification } from 'antd';
import { iFlowParams } from '.';

export const useCreateFollow = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (followParams: iFlowParams) => {
         return mutationPost<IResponse<any>>({
            url: `${apiPath.FOLLOW.CREATE}`,
            body: followParams,
         });
      },
      onSuccess: (success) => {
         notification.success({ message: 'Create follow success!' });
         return queryClient.invalidateQueries({
            queryKey: ['my-list-flow'],
         });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message ?? 'Create fail, please try again!',
         });
      },
   });
};
