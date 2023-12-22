// api/flow/edit
import { mutationDelete, mutationPost, mutationPut } from '@config/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IResponse } from '@interfaces/index';
import { apiPath } from '@config/api/path';
import { notification } from 'antd';
import { iFLowPut, iFlow, iFlowParams } from '.';

export const useDeleteId = () => {
   // const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (flowId: string) => {
         return mutationDelete<IResponse<any>>({
            url: `${apiPath.FOLLOW.DELETE.replace('{id}', flowId)}`,
            body: {},
         });
      },
      onSuccess: (success) => {
         notification.success({ message: 'Delete follow success!' });
         // return queryClient.invalidateQueries({
         //    queryKey: ['my-list-flow'],
         // });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message ?? 'Delete fail, please try again!',
         });
      },
   });
};
