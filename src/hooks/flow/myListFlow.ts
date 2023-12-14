import { getData } from '@config/api';
import { apiPath } from '@config/api/path';
import { IResponse } from '@interfaces/index';
import { useQuery } from '@tanstack/react-query';
import { iFlow } from '.';

export const useMyListFlow = () => {
   return useQuery({
      queryKey: ['my-list-flow'],
      queryFn: () => getData<IResponse<iFlow[]>>(apiPath.FOLLOW.MY_LIST),
      cacheTime: 0,
   });
};
