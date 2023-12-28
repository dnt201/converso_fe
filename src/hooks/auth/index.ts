import { mutationPost } from '@config/api';
import { apiPath } from '@config/api/path';
import { IError, IResponse } from '@interfaces/index';
import { useMutation } from '@tanstack/react-query';
import { setAccessToken, setCurrentUser } from '@utils/localStorage';
import { notification } from 'antd';

export type tCurrentUser = {
   id: number;
   username: string;
   name: string;
   avatar: string;
   phonenumber: string;
   email: string;
   address: string;
   extendData: string;
   roleId: number;
   slug: string;
   createdAt: string;
   updatedAt: string;
   token: string;
};
type tLoginResponse = IResponse<tCurrentUser>;
export type tLoginParams = {
   username: string;
   password: string;
};

export type tRegister = {
   username: string;
   password: string;
   name: string;
   avatar: string;
   phonenumber: string;
   email: string;
   address: string;
   extendData?: object;
   slug: string;
   token: string;
};

export const useMutationLogin = () => {
   return useMutation({
      mutationFn: (loginParams: tLoginParams) => {
         return mutationPost<tLoginResponse>({
            url: `${apiPath.AUTH.LOGIN}`,
            body: loginParams,
         });
      },
      onError: () => {
         notification.error({
            message: 'Wrong username or password!' || 'Unknown error, please try again!',
         });
      },
   });
};
type tRegisterResponse = IResponse<tCurrentUser> & {};
type tRegisterParams = {
   username: string;
   password: string;
   name: string;
   avatar: string;
   phonenumber: string;
   email: string;
   address: string;
   extendData?: object;
   slug: string;
};

export const useMutationRegister = () => {
   return useMutation({
      mutationFn: (registerParams: tRegisterParams) => {
         return mutationPost<tRegisterResponse>({
            url: `${apiPath.AUTH.REGISTER}`,
            body: registerParams,
         });
      },
      onSuccess: async (data) => {
         notification.success({ message: 'Register success' });
         await setCurrentUser(data.data);
         await setAccessToken(data.data.token);
      },
      onError: (error: IError) => {
         if (error.error === 'username must be unique')
            notification.error({ message: 'Username have been used!' });
         else {
            notification.error({ message: error.error || 'Unknown error, please try again!' });
         }
      },
   });
};

// export const useListUserOfTalent = (paging: iListUserFilter) => {
//     const url = apiPath.ADMINISTRATION.USER.LIST;
//     const params = queryString.stringify(paging, { arrayFormat: "comma" });
//     return useQuery({
//       queryKey: ["listUserOfTalent", paging],
//       queryFn: () => getData<IUserOfTalentResponse>(url + "?" + params),
//       cacheTime: 0,
//     });
//   };
