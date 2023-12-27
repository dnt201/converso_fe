import React, { useState, useEffect } from 'react';

import './style.less';
import AppearLayout from '@layouts/AppearLayout';
import { ChatBotLogo, Messenger } from '@assets/icons';
import { Button, Divider, Empty, Input, Modal, Skeleton, Space } from 'antd';
import {
   ArrowLeftOutlined,
   DeleteOutlined,
   EditOutlined,
   FacebookFilled,
   GlobalOutlined,
   PlusOutlined,
   WhatsAppOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { routerPath } from '@config/router/path';

import { useMyListIntent } from '@hooks/intent/myListIntent';
import { iIntent } from '@hooks/intent';
import ModalAddIntent from './ModalAddTraining';
import { CpuChipIcon } from '@heroicons/react/20/solid';
import { useDeleteIntent } from '@hooks/intent/deleteIntent';
import ModalEditTraining from './ModalEditTraining';

const ManageIntent = () => {
   const navigate = useNavigate();

   const { data: listIntentData, isLoading: listChanelLoading } = useMyListIntent();
   // const { data: listFlow, isLoading: listFlowLoading } = useMyListFlow();

   const [openAddTraining, setOpenAddTraining] = useState(false);
   const [openEditTraining, setOpenEditTraining] = useState<iIntent>();
   const [flows, setFlows] = useState([]);
   const [openConfirmModal, setOpenConfirmModal] = useState(false);
   const [intentArray, setChannels] = useState<iIntent[]>([]);
   const [currentId, setCurrentId] = useState<number>();

   const deleteChannel = useDeleteIntent();

   useEffect(() => {
      setChannels(listIntentData?.data);
   }, [listIntentData]);

   // useEffect(() => {
   //    setFlows(listFlow?.data || []);
   // }, [listFlow]);

   const filterTraining = (search) => {
      if (!search || search == '') return setChannels(listIntentData?.data);
      setChannels(
         listIntentData.data.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
      );
   };

   const handleConfirm = () => {
      deleteChannel.mutate(currentId, {
         onSuccess: () => {
            setOpenConfirmModal(false);
         },
      });
   };

   const handleCancel = () => {
      setOpenConfirmModal(false);
   };
   return (
      <AppearLayout className="manage-training-container">
         <ModalAddIntent open={openAddTraining} setCloseModal={(b) => setOpenAddTraining(b)} />
         <ModalEditTraining
            open={openEditTraining === undefined ? false : true}
            setCloseModal={() => setOpenEditTraining(undefined)}
            currentIntent={openEditTraining}
         />
         <Modal
            title="Confirm"
            okButtonProps={{ loading: deleteChannel.isLoading }}
            open={openConfirmModal}
            onOk={handleConfirm}
            onCancel={handleCancel}>
            Do you want to delete this training?
         </Modal>

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
                  <h2 className="title">Manage Training</h2>
               </Space>
               <div className="actions">
                  <Input.Search
                     width={'300px'}
                     style={{ width: 260 }}
                     placeholder={`Enter your training's name to find`}
                     onSearch={(e) => filterTraining(e)}
                  />
               </div>
            </div>
            <div className="list-training">
               <div className="training" onClick={() => setOpenAddTraining(true)}>
                  <Space direction="vertical" align="center">
                     <PlusOutlined className="icon" />
                     <span className="title">Add new training</span>
                  </Space>
               </div>

               <Divider type="vertical" style={{ height: '140px' }} />
               {listChanelLoading ? (
                  <>
                     <Skeleton.Button active className="training-skeleton" />
                     <Skeleton.Button active className="training-skeleton" />
                     <Skeleton.Button active className="training-skeleton" />
                     <Skeleton.Button active className="training-skeleton" />
                  </>
               ) : !intentArray || !intentArray.length ? (
                  <Empty description={<h5>No training...</h5>} />
               ) : (
                  <>
                     {intentArray.length &&
                        intentArray.map((item, i) => {
                           return (
                              <div key={i} className="training">
                                 <div className="training_1">
                                    <div className="icon-name">
                                       <i className="icon">
                                          <CpuChipIcon height={40} width={40} />
                                       </i>
                                       <p className="name">{item.name}</p>
                                    </div>

                                    <div className="hover_layer">
                                       <Button onClick={() => setOpenEditTraining(item)}>
                                          <EditOutlined />
                                       </Button>
                                       <Button
                                          onClick={() => {
                                             setCurrentId(item.id);
                                             setOpenConfirmModal(true);
                                          }}
                                          type="primary"
                                          danger>
                                          <DeleteOutlined />
                                       </Button>
                                    </div>
                                 </div>
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

export default ManageIntent;
