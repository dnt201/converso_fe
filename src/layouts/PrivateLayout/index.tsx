import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import './style.less';
import { getCurrentUser } from '@utils/localStorage';


const { Content } = Layout;

const PrivateLayout = () => {
   //Logged true?
   // const [logged, setLogged] = useState(getCurrentUser() !== null ? true : false);

   const currentUser = getCurrentUser();

   try {
      if (currentUser) {
         if (currentUser && currentUser.token)
            return (
               <Layout className="private-layout">
                  <div className="nav-top"></div>
                  <Content className="content">
                     <Outlet />
                  </Content>
               </Layout>
            );
         else {
            throw new Error('Current user invalid');
         }
      } else {
         localStorage.clear();
         return <Navigate to={`/auth?action=login`} />;
      }
   } catch (i) {
      localStorage.clear();
      return <Navigate to={`/login?reason=unexpected`} />;
   }
};

export default PrivateLayout;
