import { routerPath } from '@config/router/path';
import './App.less';
import HomePage from '@pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';

function App() {
   return (
      <BrowserRouter basename="/">
         <Routes>
            <Route element={<MainLayout />}>
               <Route element={<HomePage />} path={routerPath.HOME} />
            </Route>

            {/* Start: Private Route */}
            {/* <Route element={<PrivateRoutes hiddenSider={false} />}> */}
            {/* <Route path={PATH.HOME} element={<DynamicRoute />} /> */}
            {/* <Route element={<Talent />} path={PATH.TALENT} />
            <Route element={<AllEmployee />} path={PATH.ALL_EMPLOYEE} />
            <Route element={<TrainingDeveloper />} path={PATH.TRAINING_DEVELOPER} />
            <Route element={<Groups />} path={PATH.GROUP} />
            <Route element={<GroupDetail />} path={PATH.GROUP_DETAIL} />
            <Route element={<UpComing />} path={PATH.PERMISSION} />
            <Route element={<Import />} path={PATH.IMPORT} />
            <Route element={<User />} path={PATH.USER} /> */}
            {/* </Route> */}
            {/* <Route element={<PrivateRoutes hiddenSider={true} />}> */}
            {/* <Route element={<EmployeeDetail />} path={PATH.EMPLOYEE_DETAIL} /> */}
            {/* </Route> */}
            {/* End: Private Route*/}
            {/* <Route element={<Login />} path={PATH.LOGIN} />
            <Route element={<Oidc />} path={PATH.OIDC} />
            <Route element={<NotFound404 />} path={PATH.ANY} /> */}
         </Routes>
      </BrowserRouter>
   );
}

export default App;
