import { routerPath } from '@config/router/path';
import './App.less';
import HomePage from '@pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import PlayReactFlow from '@pages/PlayReactFlow';
import 'reactflow/dist/style.css';

function App() {
   return (
      <BrowserRouter basename="/">
         <Routes>
            <Route element={<MainLayout />}>
               <Route element={<HomePage />} path={routerPath.HOME} />
            </Route>
            <Route>
               <Route element={<PlayReactFlow />} path={routerPath.PLAY} />

               <Route element={<Login />} path={routerPath.LOGIN} />
               <Route element={<Register />} path={routerPath.REGISTER} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
