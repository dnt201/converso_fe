import axios from 'axios';

const apiClient = axios.create({
   baseURL: import.meta.env.VITE_BACK_END_ENDPOINT,
   headers: {
      'Content-Type': 'application/json',
   },
});

apiClient.interceptors.request.use((config) => {
   // config.timeout = ; // Wait for 5 seconds before timing out
   return config;
});
apiClient.interceptors.response.use(
   (response) => {
      if (response && (response.status === 403 || response.status === 401)) {
         if (localStorage.getItem('currentUser') !== null) {
            localStorage.clear();
         }
         // else {
         // }
         window.location.replace('/auth?action=login&logout=true&reason=forbidden');
         //  setMessageToLocalStorage(MESSAGE.FORBIDDEN);
      }
      return response;
   },
   (error) => {
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
         console.log('Request timed out');
         return Promise.reject(error);
      }
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
         if (localStorage.getItem('currentUser') !== null) {
            localStorage.clear();
         }
         // else {
         // }
         window.location.replace('/auth??action=login&logout=true&reason=forbidden');
         //  setMessageToLocalStorage(MESSAGE.FORBIDDEN);
      }
      if (error.response && error.response.data) {
         if (error.response.status >= 500) {
            const errorCode = error.response.status;
            localStorage.clear();
            // setMessageToLocalStorage(MESSAGE.SERVER_ERROR);
            window.location.replace(
               `/auth??action=login&logout=${errorCode ?? '500'}&reason=sever-error`
            );
         }
         return Promise.reject(error.response.data);
      }
      return Promise.reject(
         error.message || 'Unknown Error, please try again or call admin to get help!'
      );
   }
);
export default apiClient;
