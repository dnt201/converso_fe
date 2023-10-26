export interface IMutationHook<T> {
   url: string;
   body: T;
   queryKey: string;
}

export type IMutationPost<T> = Omit<IMutationHook<T>, 'queryKey'>;
