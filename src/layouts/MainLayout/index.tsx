import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import NavTop from '@components/NavTop';

import './style.less';

const { Content, Footer } = Layout;

const MainLayout = () => {
   const logged = true;
   if (logged) return <Navigate to="/dashboard" replace />;
   return (
      <Layout className="main-layout">
         <NavTop />
         <Content className="content">
            <Layout>
               <Content style={{ minHeight: '100vh' }}>
                  <Outlet />
               </Content>
            </Layout>
         </Content>
         <Footer className="footer" style={{ backgroundColor: '#fff', textAlign: 'center' }}>
            Ant Design ©2023 Created by Ant UED
         </Footer>
      </Layout>
   );
};

export default MainLayout;
