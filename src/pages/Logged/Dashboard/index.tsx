import React from 'react';
import './style.less';
import { ChatBotLogo } from '@assets/icons';
import {
   CloseSquareFilled,
   LogoutOutlined,
   PlusSquareFilled,
   SettingFilled,
   SlidersFilled,
} from '@ant-design/icons';
import { Button } from 'antd';
const Dashboard = () => {
   return (
      <div className="dashboard-container">
         <div className="logo">
            <ChatBotLogo />
         </div>
         <div className="list-action">
            <div className="action-item create-chat-bot">
               <i>
                  <PlusSquareFilled />
               </i>
               <span className="title">Create Chat Bot</span>
            </div>
            <div className="action-item">
               <i>
                  <SlidersFilled />
               </i>
               <span className="title">Manage chanel</span>
            </div>
            <div className="action-item">
               <i>tra</i>
               <span className="title">Training</span>
            </div>
            <div className="action-item">
               <i>
                  <SettingFilled />
               </i>
               <span className="title">Settings</span>
            </div>
            <div className="action-item logout">
               <i>
                  <LogoutOutlined />
               </i>
               <span className="title">Logout</span>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
