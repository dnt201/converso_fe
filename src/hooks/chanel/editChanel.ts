import { mutationPut } from '@config/api';
import { apiPath } from '@config/api/path';
import { IResponse } from '@interfaces/index';
import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { iChanel } from './myListChanel';
import { PickSingle } from '@hooks/customHooks';
export type tEditChanel = {};
type tLoginResponse = IResponse<tEditChanel>;
// export type tLoginParams = {
//    username: string;
//    password: string;
// };

export const useEditChanel = (idChanel: PickSingle<iChanel, 'id'>) => {
   return useMutation({
      mutationFn: (chanel: iChanel) => {
         return mutationPut<tLoginResponse>({
            url: `${apiPath.CHANEL.EDIT_BY_ID.replace('{id}', idChanel.toString())}`,
            body: chanel,
         });
      },
      onSuccess: (success) => {
         notification.success({ message: success.message });
      },
      onError: (error: IResponse<any>) => {
         notification.error({
            message: error.message,
         });
      },
   });
};
