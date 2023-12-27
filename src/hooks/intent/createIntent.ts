import { mutationPost } from '@config/api';
import { apiPath } from '@config/api/path';
import { IResponse } from '@interfaces/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { iIntent, iIntentCreate } from '.';
export type tCreateChanel = {};

type iCreateIntentResponse = IResponse<any>;

export const useCreateIntent = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (intent: iIntentCreate) => {
         return mutationPost<iCreateIntentResponse>({
            url: `${apiPath.INTENT.CREATE}`,
            body: intent,
         });
      },
      onSuccess: (success) => {
         return queryClient.invalidateQueries({
            queryKey: ['my-list-intent'],
         });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message,
         });
      },
   });
};
