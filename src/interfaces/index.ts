export interface iNode {
   label: string;
}

export interface IResponse<T> {
   statusCode: number;
   message: string;
   data: T;
}

export interface IPaging {
   currentPage: number;
   itemsPerPage: number;
   totalItems: number;
   totalPages: number;
}

export interface IPagingFilter {
   currentPage: number;
   pageSize: number;
}

export interface I360FeedBackFilter {}

