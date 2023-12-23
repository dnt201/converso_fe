import { ChatBotLogo } from '@assets/icons';
import AppearLayout from '@layouts/AppearLayout';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.less';
import {
   ArrowLeftOutlined,
   DeleteOutlined,
   EditOutlined,
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
import { Button, Empty, Input, Modal, Popconfirm, Space, notification } from 'antd';
import ModalCreateChatBot from './ModalCreateChatBot';
import { useMyListFlow } from '@hooks/flow/myListFlow';
import { useDeleteId } from '@hooks/flow/deleteFlow';
import { setCurrentUser } from '@utils/localStorage';
import { IResponse } from '@interfaces/index';
import { iFlow } from '@hooks/flow';

const listChatbot = { data: [{ id: '1', flowType: 'MSG', name: 'Dnt201' }] };
interface iChatbotManagementProps {}
const ChatbotManagement: React.FC<iChatbotManagementProps> = (props) => {
   const {} = props;

   const navigate = useNavigate();
   const [openCreateChatbot, setOpenCreateChatbot] = useState(false);
   const [currentId, setCurrentId] = useState<string>();

   const [flows, setFlows] = useState<iFlow[]>();

   const filterChannels = (search) => {
      if (!search || search == '') return setFlows(listChatbot.data ?? undefined);

      setFlows(listChatbot.data.filter((e) => e.name.toLowerCase().includes(search.toLowerCase())));
   };
   const deleteFlowById = useDeleteId();
   const { data: listChatbot } = useMyListFlow();

   useEffect(() => {
      setFlows(listChatbot?.data || []);
   }, [listChatbot]);
   //Todo: API
   // const { data: listChatbot, isLoading: isListChatbotLoading } = useMyListFlow();
   return (
      <AppearLayout className="chatbot-management-container">
         <ModalCreateChatBot
            open={openCreateChatbot}
            setOpenModal={(b) => setOpenCreateChatbot(b)}
         />

         <Modal
            title="Delete flow"
            open={currentId !== undefined}
            onOk={() => {
               deleteFlowById.mutate(currentId, {
                  onSuccess: () => {
                     setCurrentId(undefined);
                  },
               });
            }}
            okButtonProps={{ loading: deleteFlowById.isLoading }}
            onCancel={() => setCurrentId(undefined)}>
            Do you want to delete this flow?
         </Modal>
         <div className="logo">
            <ChatBotLogo />
         </div>
         <div
            className="header"
            onClick={() => {
               //   navigate(routerPath.MANAGE_CHATBOT);
            }}>
            <Space align="center" size={0}>
               <Button
                  type="text"
                  style={{ borderRadius: 0 }}
                  onClick={() => {
                     navigate(routerPath.DASHBOARD);
                  }}>
                  <ArrowLeftOutlined />
               </Button>
               <h2 className="title">Manage Flow</h2>
            </Space>
            <div className="actions">
               <Input.Search
                  width={'300px'}
                  style={{ width: 260 }}
                  placeholder={`Enter your flow's name to find`}
                  onSearch={(e) => filterChannels(e)}
               />
            </div>
         </div>
         <div className="list-chatbot-container">
            <span className="title">Template</span>
            <div className="list-chatbot">
               <div
                  className="action-item create-chat-bot"
                  onClick={() => setOpenCreateChatbot(true)}>
                  <i>{<PlusSquareFilled />}</i>
                  <p className="title">Create Flow</p>
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
            <span className="title">List flow</span>
            <div className="list-chatbot">
               {!flows ? (
                  <Empty />
               ) : (
                  flows.map((e) => {
                     return (
                        <div key={e.id} className="action-item create-chat-bot">
                           <div className="hover_layer">
                              <Button
                                 onClick={() =>
                                    navigate(
                                       routerPath.MANAGE_CHATBOT_BY_ID.replace(
                                          ':id',
                                          e.id.toString()
                                       )
                                    )
                                 }>
                                 <EditOutlined />
                              </Button>

                              <Button
                                 type="primary"
                                 danger
                                 onClick={() => {
                                    setCurrentId(e.id.toString());
                                 }}>
                                 <DeleteOutlined />
                              </Button>
                           </div>
                           <i>{e.flowType === 'MSG' ? <FacebookFilled /> : <MessageFilled />}</i>
                           <p className="title">{e.name}</p>
                        </div>
                     );
                  })
               )}
            </div>
         </div>
      </AppearLayout>
   );
};

export default ChatbotManagement;
