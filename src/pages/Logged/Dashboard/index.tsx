import './style.less';
import { ChatBotLogo } from '@assets/icons';
import { LogoutOutlined, RobotFilled, SettingFilled, SlidersFilled } from '@ant-design/icons';
import { notification } from 'antd';
import { CpuChipIcon } from '@heroicons/react/20/solid';
import AppearLayout from '@layouts/AppearLayout';
import { useNavigate } from 'react-router-dom';
import { routerPath } from '@config/router/path';

const Dashboard = () => {
   const navigate = useNavigate();
   return (
      <AppearLayout className="dashboard-container">
         <div className="logo">
            <ChatBotLogo />
         </div>
         <div className="list-action">
            <div
               className="action-item create-chat-bot"
               onClick={() => {
                  navigate(routerPath.MANAGE_CHATBOT);
               }}>
               <i>
                  <RobotFilled />
               </i>
               <span className="title">Manage ChatBot</span>
            </div>
            <div
               className="action-item"
               onClick={() => {
                  navigate(routerPath.MANAGE_CHANEL);
               }}>
               <i>
                  <SlidersFilled />
               </i>
               <span className="title">Manage Chanel</span>
            </div>
            <div className="action-item">
               <i className=" lazy">
                  <CpuChipIcon height={40} width={40} />
               </i>
               <span className="title">Training</span>
            </div>
            <div className="action-item">
               <i>
                  <SettingFilled />
               </i>
               <span className="title">Settings</span>
            </div>
            <div
               className="action-item logout"
               onClick={() => {
                  localStorage.clear();
                  notification.success({ message: 'Logout success!' });
                  navigate('/auth?action=login', { replace: true });
               }}>
               <i>
                  <LogoutOutlined />
               </i>
               <span className="title">Logout</span>
            </div>
         </div>
      </AppearLayout>
   );
};

export default Dashboard;
