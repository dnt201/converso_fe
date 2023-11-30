import { tCurrentUser } from '@hooks/auth';

export const setCurrentUser = (curUser: tCurrentUser) => {
   localStorage.setItem('curUser', JSON.stringify(curUser));
};

export const getCurrentUser = () => {
   let temp = localStorage.getItem('curUser');
   return temp !== null ? (JSON.parse(temp) as tCurrentUser) : undefined;
};

export const clearLocalStorage = () => {
   localStorage.clear();
};
