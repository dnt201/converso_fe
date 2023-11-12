import { Layout } from 'antd';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import NavTop from '@components/NavTop';

import './style.less';

const { Content, Footer } = Layout;

const PrivateLayout = () => {
   //Logged true?
   const logged = true;
   const navigate = useNavigate();

   if (!logged) {
      localStorage.clear();

      return <Navigate to={'/'} replace />;
   }
   return (
      <Layout className="private-layout">
         <div className="nav-top"></div>
         <Content className="content">
            <Outlet />
         </Content>
      </Layout>
   );
};

export default PrivateLayout;
