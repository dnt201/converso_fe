import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import './style.less';
import { getCurrentUser } from '@utils/localStorage';
import NavigationTop from '@components/NavigationTop';

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
               <NavigationTop />
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
            <NavigationTop />
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
