import {
   CheckOutlined,
   CloseOutlined,
   CustomerServiceOutlined,
   DeleteOutlined,
   EditOutlined,
   MenuUnfoldOutlined,
   MessageOutlined,
   PlusOutlined,
   SettingOutlined,
} from '@ant-design/icons';
import { PromptCollectData } from '@pages/PlayReactFlow/CustomNode/PromptCollectNode';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Node } from 'reactflow';

import './style.less';
import FormItem from 'antd/es/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import UpdateText from './UpdateText';

type tKeyTab = 'general' | 'settings' | 'grammar';

interface PromptCollectMenuProps {
   promptCollect: Node<PromptCollectData>;
   closeModal: () => void;
   setNode: (curNode: Node | null) => void;
}
interface FormChatbotResponse {
   chatbotResponse: string;
}

const fakeList = ['Hello', '12412412', 'aaaa', 'bbbb'];
const PromptCollectMenu: React.FC<PromptCollectMenuProps> = (props) => {
   const { closeModal, promptCollect, setNode } = props;
   const [innerNode, setInnerNode] = useState<Node<PromptCollectData>>(promptCollect);
   const [keyTab, setKeyTab] = useState<tKeyTab>('general');
   const [listAnswer, setListAnswer] = useState<string[]>(fakeList);
   const [formChatbotResponse] = useForm();
   const formChatbotResponseFinish = (formChatbotResponseValue: FormChatbotResponse) => {
      let newListText = innerNode.data.text.concat({
         key: innerNode.data.text.length + 1,
         message: formChatbotResponseValue.chatbotResponse,
         language: 'vn',
      });

      setInnerNode({
         ...innerNode,
         data: {
            ...innerNode.data,
            text: newListText,
         },
      });
      formChatbotResponse.resetFields();
   };

   useEffect(() => {
      console.log(innerNode.data.text);
      setNode(innerNode);
   }, [innerNode]);

   return (
      <div className="edit-mode" onClick={(e) => e.preventDefault()}>
         <div className="node-header">
            <div className="top">
               <Space style={{ fontSize: 18, color: 'var(--color-main-blue)' }} align="center">
                  <CustomerServiceOutlined style={{ fontSize: 24 }} />
                  <span>Prompt And Collect</span>
               </Space>
               <Button
                  className="close-btn"
                  type="text"
                  onClick={(e) => {
                     e.stopPropagation();
                     e.preventDefault();
                     closeModal();
                  }}>
                  <CloseOutlined />
               </Button>
            </div>
            <Input
               className="input-edit-name"
               placeholder="Enter your node name"
               onChange={(e) => {
                  setInnerNode((pre) => {
                     return { ...pre, data: { ...pre.data, name: e.target.value } };
                  });
               }}
               onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                     e.currentTarget.blur();
                  }
               }}
               defaultValue={promptCollect.data.name}
            />
         </div>

         <div className="content">
            <div className="response">
               <div className="step-menu">
                  <div className="header">
                     Edit node <EditOutlined />
                  </div>
                  <div
                     className={'item ' + (keyTab === 'general' ? ' selected' : '')}
                     onClick={() => setKeyTab('general')}>
                     <i className="icon">
                        <MenuUnfoldOutlined />
                     </i>
                     <span className="text">General</span>
                  </div>
                  <div
                     className={'item ' + (keyTab === 'settings' ? ' selected' : '')}
                     onClick={() => setKeyTab('settings')}>
                     <i className="icon">
                        <SettingOutlined />
                     </i>
                     <span className="text">Settings</span>
                  </div>
                  <div
                     className={'item ' + (keyTab === 'grammar' ? ' selected' : '')}
                     onClick={() => setKeyTab('grammar')}>
                     <i className="icon">
                        <CheckOutlined />
                     </i>
                     <span className="text">Grammar</span>
                  </div>
               </div>
               {keyTab === 'general' ? (
                  <>
                     <div className="title">
                        <MessageOutlined />
                        <span>Chatbot answer</span>
                     </div>
                     {innerNode.data.text.map((item, index) => {
                        return (
                           <UpdateText
                              index={index}
                              innerNode={innerNode}
                              item={item}
                              setInnerNode={(n) => setInnerNode(n)}
                              key={index}
                           />
                        );
                     })}

                     <Form<FormChatbotResponse>
                        form={formChatbotResponse}
                        onFinish={formChatbotResponseFinish}>
                        <Form.Item
                           name="chatbotResponse"
                           rules={[{ required: true, message: 'Chatbot response is null' }]}>
                           <div className="input-container add">
                              <Input.TextArea
                                 onKeyDown={(e) => {
                                    if (e.code === 'Enter') {
                                       formChatbotResponse.submit();
                                       e.currentTarget.blur();
                                    }
                                 }}
                                 placeholder="Enter your chatbot response"
                                 style={{
                                    padding: '10px 8px',
                                 }}
                                 autoSize={{ minRows: 1, maxRows: 6 }}
                              />
                              <div className="actions">
                                 <i className="item" onClick={() => formChatbotResponse.submit()}>
                                    <PlusOutlined />
                                 </i>
                              </div>
                           </div>
                        </Form.Item>
                     </Form>
                  </>
               ) : keyTab === 'settings' ? (
                  <></>
               ) : (
                  <>
                     <div className="settings">
                        <Form layout="vertical">
                           <Form.Item label="Grammar type">
                              <Select />
                           </Form.Item>
                           <Form.Item label="Grammar">
                              <Select />
                           </Form.Item>
                           <Form.Item label="Assign Chatbot Response">
                              <Select />
                           </Form.Item>
                           <Form.Item label="Assign Intent">
                              <Select />
                           </Form.Item>
                        </Form>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default PromptCollectMenu;
