import React, { useState } from 'react';

import './style.less';
import AppearLayout from '@layouts/AppearLayout';
import { ChatBotLogo } from '@assets/icons';
import { Button, Divider, Empty, Input, Skeleton, Space } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { routerPath } from '@config/router/path';
import { iChanel, useMyListChanel } from '@hooks/chanel/myListChanel';
import ModalAddChanel from './ModalAddChanel';
import ModalEditChanel from './ModalEditChanel';

const ManageChanel = () => {
   const navigate = useNavigate();

   const [openAddChanel, setOpenAddChanel] = useState(false);
   const [openEditChanel, setOpenEditChanel] = useState<iChanel>();

   //Todo: Api
   const { data: listChanelData, isLoading: listChanelLoading } = useMyListChanel();

   return (
      <AppearLayout className="manage-chanel-container">
         <ModalAddChanel open={openAddChanel} setCloseModal={(b) => setOpenAddChanel(b)} />
         <ModalEditChanel
            open={openEditChanel ? true : false}
            setCloseModal={() => setOpenEditChanel(undefined)}
            chanelProps={openEditChanel}
         />
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
                  <Input.Search
                     width={'300px'}
                     style={{ width: 260 }}
                     placeholder={`Enter your chanel's name to find`}
                  />
               </div>
            </div>
            <div className="list-chanel">
               <div className="chanel" onClick={() => setOpenAddChanel(true)}>
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
                           <div
                              className="chanel"
                              key={item.id}
                              onClick={() => setOpenEditChanel(item)}>
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
