import { tCurrentUser } from '@hooks/auth';

export const setCurrentUser = (curUser: tCurrentUser) => {
   localStorage.setItem('curUser', JSON.stringify(curUser));
};

export const getCurrentUser = () => {
   const temp = localStorage.getItem('curUser');
   return temp !== null ? (JSON.parse(temp) as tCurrentUser) : undefined;
};



export const setAccessToken = (access: string) => {
   return localStorage.setItem('accessToken', access);
};

export const getAccessToken = () => {
   return localStorage.getItem('accessToken');
};

export const removeAccessToken = () => {
   localStorage.removeItem('accessToken');
};

export const clearLocalStorage = () => {
   localStorage.clear();
};
