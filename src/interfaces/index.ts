export interface iNode {
   label: string;
}

export interface IResponse<T> {
   statusCode: number;
   message: string;
   data: T;
}
export interface IError {
   error: string;
   message: string;
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


