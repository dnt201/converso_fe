import { ChatBotLogo } from '@assets/icons';
import AppearLayout from '@layouts/AppearLayout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.less';
import {
   FacebookFilled,
   MessageFilled,
   NotificationFilled,
   NotificationOutlined,
   PlusSquareFilled,
   ShoppingFilled,
   ToolFilled,
} from '@ant-design/icons';
import { routerPath } from '@config/router/path';
import Loader from '@components/Loader';
import { Empty, Space, notification } from 'antd';
import ModalCreateChatBot from './ModalCreateChatBot';
import { useMyListFlow } from '@hooks/flow/myListFlow';

const listChatbot = { data: [{ id: '1', flowType: 'MSG', name: 'Dnt201' }] };
interface iChatbotManagementProps {}
const ChatbotManagement: React.FC<iChatbotManagementProps> = (props) => {
   const {} = props;

   const navigate = useNavigate();
   const [openCreateChatbot, setOpenCreateChatbot] = useState(false);

   //Todo: API
   // const { data: listChatbot, isLoading: isListChatbotLoading } = useMyListFlow();
   return (
      <AppearLayout className="chatbot-management-container">
         <ModalCreateChatBot
            open={openCreateChatbot}
            setOpenModal={(b) => setOpenCreateChatbot(b)}
         />
         <div className="logo">
            <ChatBotLogo />
         </div>
         <div className="list-chatbot-container">
            <span className="title">Template</span>
            <div className="list-chatbot">
               <div
                  className="action-item create-chat-bot"
                  onClick={() => setOpenCreateChatbot(true)}>
                  <i>{<PlusSquareFilled />}</i>
                  <p className="title">Create Chatbot</p>
               </div>
               <div className="slider" />
               <div
                  className="action-item create-chat-bot"
                  onClick={() => notification.info({ message: 'This feature is coming soon!' })}>
                  <i>{<ShoppingFilled />}</i>
                  <p className="title">Shopping Template</p>
               </div>
               <div
                  className="action-item create-chat-bot"
                  onClick={() => notification.info({ message: 'This feature is coming soon!' })}>
                  <i>
                     <ToolFilled />
                  </i>
                  <p className="title">Support Template</p>
               </div>
               <div
                  className="action-item create-chat-bot"
                  onClick={() => notification.info({ message: 'This feature is coming soon!' })}>
                  <i>
                     <NotificationFilled />
                  </i>
                  <p className="title">Marketing Template</p>
               </div>
            </div>
         </div>
         <div className="list-chatbot-container">
            <span className="title">List chatbot</span>
            <div className="list-chatbot">
               {!listChatbot ? (
                  <Empty />
               ) : (
                  listChatbot.data.map((e) => {
                     return (
                        <div
                           key={e.id}
                           className="action-item create-chat-bot"
                           onClick={() => {
                              navigate(
                                 routerPath.MANAGE_CHATBOT_BY_ID.replace(
                                    ':chatbotId',
                                    e.id.toString()
                                 )
                              );
                           }}>
                           <i>{e.flowType === 'MSG' ? <FacebookFilled /> : <MessageFilled />}</i>
                           <p className="title">{e.name}</p>
                        </div>
                     );
                  })
               )}
            </div>
         </div>
         {/* <div
         className="action-item create-chat-bot"
         onClick={() => {
            navigate(routerPath.MANAGE_CHATBOT);
         }}>
         <i>
            <RobotFilled />
         </i>
         <span className="title">Manage ChatBot</span>
      </div>
      <div className="action-item">
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
      </div> */}
      </AppearLayout>
   );
};

export default ChatbotManagement;
