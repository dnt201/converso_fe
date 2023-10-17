import { Outlet } from 'react-router-dom';

import './style.less';
const AppearLayout = () => {
   return (
      <div className="appear-layout">
         <Outlet />
      </div>
   );
};

export default AppearLayout;
