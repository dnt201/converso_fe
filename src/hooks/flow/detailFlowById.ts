import { getData } from '@config/api';
import { apiPath } from '@config/api/path';
import { IResponse } from '@interfaces/index';
import { useQuery } from '@tanstack/react-query';
import { iFlow } from '.';

export const useDetailFlowById = (id: string) => {
   return useQuery({
      queryKey: ['my-detail-flow-by-id', id],
      queryFn: () => getData<IResponse<iFlow>>(apiPath.FOLLOW.DETAIL_BY_ID.replace('{id}', id)),
      cacheTime: 5000,
      suspense: true,
   });
};
