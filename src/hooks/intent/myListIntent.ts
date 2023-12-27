import { IResponse } from '@interfaces/index';
import { getData } from '@config/api';
import { apiPath } from '@config/api/path';
import { useQuery } from '@tanstack/react-query';
import { iIntent } from '.';

type iMyListIntentResponse = IResponse<iIntent[]>;
export const useMyListIntent = () => {
   return useQuery({
      queryKey: ['my-list-intent'],
      queryFn: () => getData<iMyListIntentResponse>(apiPath.INTENT.GET_LIST),
      cacheTime: 0,
   });
};

export const useMyListIntentSuspense = () => {
   return useQuery({
      queryKey: ['my-list-intent-suspense'],
      queryFn: () => getData<iMyListIntentResponse>(apiPath.INTENT.GET_LIST),
      cacheTime: 0,
      suspense: true,
   });
};
