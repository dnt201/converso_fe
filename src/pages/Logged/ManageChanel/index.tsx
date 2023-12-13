import React, { useState, useEffect } from 'react';

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

   const { data: listChanelData, isLoading: listChanelLoading } = useMyListChanel();

   const [openAddChanel, setOpenAddChanel] = useState(false);
   const [openEditChanel, setOpenEditChanel] = useState<iChanel>();
   const [channelsArray, setChannels] = useState<any>([]);

   useEffect(() => {
      setChannels(listChanelData?.data);
   }, [listChanelData]);

   const filterChannels = (search) => {
      if (!search || search == '') return setChannels(listChanelData?.data);

      setChannels(
         listChanelData.data.filter((e) =>
            e.contactName.toLowerCase().includes(search.toLowerCase())
         )
      );
   };

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
                     onChange={(e) => filterChannels(e.target.value)}
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
               ) : !channelsArray || !channelsArray.length ? (
                  <Empty description={<h5>No channel...</h5>} />
               ) : (
                  <>
                     {channelsArray.length &&
                        channelsArray.map((item) => {
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
