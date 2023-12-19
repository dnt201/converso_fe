// api/flow/edit
import { mutationPost, mutationPut } from '@config/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IResponse } from '@interfaces/index';
import { apiPath } from '@config/api/path';
import { notification } from 'antd';
import { iFLowPut, iFlow, iFlowParams } from '.';

export const useEditFollow = () => {
   // const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (followParams: iFLowPut) => {
         return mutationPost<IResponse<any>>({
            url: `${apiPath.FOLLOW.EDIT}`,
            body: followParams,
         });
      },
      onSuccess: (success) => {
         notification.success({ message: 'Update follow success!' });
         // return queryClient.invalidateQueries({
         //    queryKey: ['my-list-flow'],
         // });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message ?? 'Update fail, please try again!',
         });
      },
   });
};
