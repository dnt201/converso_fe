import React from 'react';

import './style.less';
import AppearLayout from '@layouts/AppearLayout';
import { ChatBotLogo } from '@assets/icons';
import { Button, Divider, Empty, Input, Skeleton, Space } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { routerPath } from '@config/router/path';
import { useMyListChanel } from '@hooks/chanel/myListChanel';

const ManageChanel = () => {
   const navigate = useNavigate();
   const { data: listChanelData, isLoading: listChanelLoading } = useMyListChanel();
   return (
      <AppearLayout className="manage-chanel-container">
         <div className="nav-top">
            <Space size={4} align="center">
               <ChatBotLogo />
            </Space>
         </div>
         <div className="content">
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
                  <h2 className="title">Manage Chanel</h2>
               </Space>
               <div className="actions">
                  {/* <Button type="primary">
                     Add new chanel
                     <PlusOutlined />
                  </Button> */}
                  <Input.Search
                     width={'300px'}
                     style={{ width: 260 }}
                     placeholder={`Enter your chanel's name to find`}
                  />
               </div>
            </div>
            <div className="list-chanel">
               <div className="chanel">
                  <Space direction="vertical" align="center">
                     <PlusOutlined className="icon" />
                     <span className="title">Add new chanel</span>
                  </Space>
               </div>

               <Divider type="vertical" style={{ height: '140px' }} />
               {listChanelLoading ? (
                  <>
                     <Skeleton.Button active className="chanel-skeleton" />
                     <Skeleton.Button active className="chanel-skeleton" />
                     <Skeleton.Button active className="chanel-skeleton" />
                     <Skeleton.Button active className="chanel-skeleton" />
                  </>
               ) : !listChanelData ? (
                  <Empty />
               ) : (
                  <>
                     {listChanelData.data.map((item) => {
                        return (
                           <div className="chanel" key={item.id}>
                              {item.contactName}
                           </div>
                        );
                     })}
                  </>
               )}
            </div>
         </div>
      </AppearLayout>
   );
};

export default ManageChanel;
