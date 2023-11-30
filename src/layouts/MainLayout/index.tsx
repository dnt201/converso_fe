import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import NavTop from '@components/NavTop';

import './style.less';
import { getCurrentUser } from '@utils/localStorage';

const { Content, Footer } = Layout;

const MainLayout = () => {
   const currentUser = getCurrentUser();
   try {
      if (currentUser) {
         return <Navigate to="/dashboard" replace />;
      } else {
         localStorage.clear();
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
      }
   } catch (i) {
      localStorage.clear();
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
   }
};

export default MainLayout;
