import { routerPath } from '@config/router/path';
import './App.less';
import HomePage from '@pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import PlayReactFlow from '@pages/PlayReactFlow';
import 'reactflow/dist/style.css';
import AppearLayout from '@layouts/AppearLayout';

function App() {
   return (
      <BrowserRouter basename="/">
         <Routes>
            <Route element={<MainLayout />}>
               <Route element={<HomePage />} path={routerPath.HOME} />
            </Route>
            <Route>
               <Route element={<PlayReactFlow />} path={routerPath.PLAY} />

               <Route element={<AppearLayout />}>
                  <Route element={<Login />} path={routerPath.LOGIN} />
               </Route>
               <Route element={<Register />} path={routerPath.REGISTER} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
