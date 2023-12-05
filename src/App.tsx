import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
   return (
      <BrowserRouter basename="/">
         <Routes>
            <Route element={<MainLayout />}>
               <Route element={<AuthPage />} path={routerPath.AUTH} />
               <Route element={<HomePage />} path={routerPath.HOME} />
            </Route>
            <Route element={<PrivateLayout />}>
               <Route element={<Dashboard />} path={routerPath.DASHBOARD} />
               <Route element={<DetailChatBot />} path={routerPath.MANAGE_CHATBOT_BY_ID} />
               <Route element={<ChatbotManagement />} path={routerPath.MANAGE_CHATBOT} />
               <Route element={<ManageChanel />} path={routerPath.MANAGE_CHANEL} />
               <Route element={<Loader />} path={'/abc'} />
            </Route>
            <Route path={routerPath.ANY} element={<NotFound />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
