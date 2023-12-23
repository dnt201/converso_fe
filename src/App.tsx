import {
   BrowserRouter,
   Navigate,
   Route,
   RouterProvider,
   Routes,
   createBrowserRouter,
   createRoutesFromElements,
} from 'react-router-dom';
import { routerPath } from '@config/router/path';

import HomePage from '@pages/HomePage';
import MainLayout from '@layouts/MainLayout';
import DetailChatBot from '@pages/DetailChatBot';
import AuthPage from '@pages/auth';
import NotFound from '@pages/NotFound';
import Dashboard from '@pages/Logged/Dashboard';
import ManageChanel from '@pages/Logged/ManageChanel';
import ChatbotManagement from '@pages/Logged/ChatbotManagement';
import PrivateLayout from '@layouts/PrivateLayout';
import Loader from '@components/Loader';
import './App.less';
import 'reactflow/dist/style.css';
import CustomError from '@components/CustomError';

function App() {
   const router = createBrowserRouter([
      // {
      //    path: '',
      //    element: <Navigate to="/dashboard" replace />,
      // },
      {
         path: '/',
         element: <MainLayout />,
         errorElement: <CustomError />,
         children: [
            {
               path: routerPath.AUTH,
               element: <AuthPage />,
            },
            {
               path: routerPath.HOME,
               element: <HomePage />,
            },
            {
               path: routerPath.ANY,
               element: <NotFound />,
            },
         ],
      },
      {
         path: '/',
         element: <PrivateLayout />,
         errorElement: <CustomError />,

         children: [
            {
               path: routerPath.DASHBOARD,
               element: <Dashboard />,
            },
            {
               path: routerPath.MANAGE_CHATBOT_BY_ID,
               element: <DetailChatBot />,
            },
            {
               path: routerPath.MANAGE_CHATBOT,
               element: <ChatbotManagement />,
            },
            {
               path: routerPath.MANAGE_CHANEL,
               element: <ManageChanel />,
            },
            {
               path: routerPath.ANY,
               element: <NotFound />,
            },
         ],
      },
   ]);

   return <RouterProvider router={router} />;
}

export default App;
