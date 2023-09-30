import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import NavTop from '@components/navtop';

import './style.less';

const { Content, Footer } = Layout;

const MainLayout = () => {
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
