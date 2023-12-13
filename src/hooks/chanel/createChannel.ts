import { mutationPost } from '@config/api';
import { apiPath } from '@config/api/path';
import { IResponse } from '@interfaces/index';
import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { iChanel } from './myListChanel';
export type tCreateChanel = {};
type tLoginResponse = IResponse<tCreateChanel>;

export const useCreateChanel = () => {
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
            url: `${apiPath.CHANEL.CREATE}`,
            body: chanel,
         });
      },
      onSuccess: (success) => {
         notification.success({ message: 'Saved' });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message,
         });
      },
   });
};
