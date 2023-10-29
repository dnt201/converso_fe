import { mutationPost } from '@config/api';
import { apiPath } from '@config/api/path';
import { IResponse } from '@interfaces/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Login = {
   username: string;
   password: string;
};
type LoginResponse = IResponse<Login> & {};
export type LoginParams = {
   username: string;
   password: string;
};

export const useMutationLogin = () => {
   return useMutation({
      mutationFn: (loginParams: LoginParams) =>
         mutationPost<LoginResponse>({
            url: `${apiPath.AUTH.LOGIN}`,
            body: loginParams,
         }),

      onSuccess: (data) => {
         // ✅ refetch the comments list for our blog post
      },
   });
};

type Register = {
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
type RegisterResponse = IResponse<Register> & {};
type RegisterParams = {
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
      mutationFn: (registerParams: RegisterParams) =>
         mutationPost<LoginResponse>({
            url: `${apiPath.AUTH.REGISTER}`,
            body: registerParams,
         }),

      onSuccess: (data) => {
         // ✅ refetch the comments list for our blog post
         if (data.statusCode === 200) {
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
