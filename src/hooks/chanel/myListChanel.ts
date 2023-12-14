import { IResponse } from '@interfaces/index';
import { getData } from '@config/api';
import { apiPath } from '@config/api/path';
import { useQuery } from '@tanstack/react-query';

export interface iChanel {
   id: number;
   contactId: string;
   contactName: string;
   credentials: iMessengerCredentials | iWebCredentials | iLineCredentials | any;
   active?: boolean;
   flowId?: number;
   //Credentials
   PageToken?: string;
   WebhookSecret?: string;
   LineToken?: string;

   channelTypeId: number;
   createdAt?: string;
   updatedAt?: string;
}

export interface iMessengerCredentials {
   PageToken: string;
   WebhookSecret: string;
}

export interface iLineCredentials {
   LineToken: string;
}

export interface iWebCredentials {
   PageToken: string;
   WebhookSecret: string;
}

type iMyListChanelResponse = IResponse<iChanel[]>;
export const useMyListChanel = () => {
   return useQuery({
      queryKey: ['my-list-chanel'],
      queryFn: () => getData<iMyListChanelResponse>(apiPath.CHANEL.MY_LIST),
      cacheTime: 0,
   });
};
