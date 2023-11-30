import { ChatBotLogo } from '@assets/icons';
import AppearLayout from '@layouts/AppearLayout';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.less';
import { FacebookFilled, MessageFilled, PlusSquareFilled } from '@ant-design/icons';
import { routerPath } from '@config/router/path';
import Loader from '@components/Loader';

const listChatbot = [
   {
      id: 1,
      name: 'Shop dunk facebook',
      type: 'MSG',
   },
   {
      id: 2,
      name: 'Jagermeister Đà Lạt Cityeister Đà Lạt Cityeister Đà Lạt Cityeister Đà Lạt City',
      type: '-',
   },
   {
      id: 3,
      name: 'Tự sự Orange + Hà Nhi',
      type: '-',
   },
   {
      id: 4,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
   {
      id: 5,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
   {
      id: 6,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
   {
      id: 4,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
   {
      id: 4,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
   {
      id: 1,
      name: 'Shop dunk facebook',
      type: 'MSG',
   },
   {
      id: 2,
      name: 'Jagermeister Đà Lạt Cityeister Đà Lạt Cityeister Đà Lạt Cityeister Đà Lạt City',
      type: '-',
   },
   {
      id: 3,
      name: 'Tự sự Orange + Hà Nhi',
      type: '-',
   },
   {
      id: 4,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
   {
      id: 5,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
   {
      id: 1,
      name: 'Shop dunk facebook',
      type: 'MSG',
   },
   {
      id: 2,
      name: 'Jagermeister Đà Lạt Cityeister Đà Lạt Cityeister Đà Lạt Cityeister Đà Lạt City',
      type: '-',
   },
   {
      id: 3,
      name: 'Tự sự Orange + Hà Nhi',
      type: '-',
   },
   {
      id: 4,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
   {
      id: 5,
      name: 'Example VCS LCK LPL LBB',
      type: '-',
   },
];

interface iChatbotManagementProps {}
const ChatbotManagement: React.FC<iChatbotManagementProps> = (props) => {
   const {} = props;
   const navigate = useNavigate();
   return (
      <AppearLayout className="chatbot-management-container">
         <div className="logo">
            <ChatBotLogo />
         </div>

         <span className="title">Template</span>
         <div className="list-chatbot">
            <div className="action-item create-chat-bot">
               <i>{<PlusSquareFilled />}</i>
               <p className="title">Create Chatbot</p>
            </div>
            <div className="slider" />
            <div className="action-item create-chat-bot">
               <i>{<PlusSquareFilled />}</i>
               <p className="title">Template A</p>
            </div>
            <div className="action-item create-chat-bot">
               <i>{<PlusSquareFilled />}</i>
               <p className="title">Template B</p>
            </div>
            <div className="action-item create-chat-bot">
               <i>{<PlusSquareFilled />}</i>
               <p className="title">Template C</p>
            </div>
         </div>
         <span className="title">List chatbot</span>
         <div className="list-chatbot">
            {listChatbot.map((e) => {
               return (
                  <div
                     key={e.id}
                     className="action-item create-chat-bot"
                     onClick={() => {
                        navigate(
                           routerPath.MANAGE_CHATBOT_BY_ID.replace(':chatbotId', e.id.toString())
                        );
                     }}>
                     <i>{e.type === 'MSG' ? <FacebookFilled /> : <MessageFilled />}</i>
                     <p className="title">{e.name}</p>
                  </div>
               );
            })}
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
         </div>
      </AppearLayout>
   );
};

export default ChatbotManagement;
