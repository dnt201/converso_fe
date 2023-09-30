import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.less';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         refetchOnMount: false,
         refetchOnReconnect: false,
         retry: false,
         staleTime: 5 * 60 * 1000,
      },
   },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         {/* <Suspense fallback={<Loader />}> */}
         <ConfigProvider
            theme={{
               token: {
                  colorPrimary: '#0067E6',
               },
            }}>
            <App />
         </ConfigProvider>
         {/* </Suspense> */}
      </QueryClientProvider>
   </React.StrictMode>
);
