import { CloseOutlined, MessageFilled } from '@ant-design/icons';
import { SendAMessageData } from '@pages/DetailChatBot/CustomNode/SendAMessageNode';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Node } from 'reactflow';
import './style.less';
interface SendAMessageMenuProps {
   promptCollect: Node<SendAMessageData>;
   closeModal: () => void;
   setNode: (curNode: Node | null) => void;
}
const SendAMessageMenu: React.FC<SendAMessageMenuProps> = (props) => {
   const { closeModal, promptCollect, setNode } = props;
   const [innerNode, setInnerNode] = useState<Node<SendAMessageData>>(promptCollect);

   useEffect(() => {
      //   console.log(innerNode.data.text);
      setNode(innerNode);
   }, [innerNode]);

   return (
      <div className="edit-mode-send-a-message" onClick={(e) => e.preventDefault()}>
         <div className="node-header">
            <div className="top">
               <Space style={{ fontSize: 18, color: 'var(--color-main-blue)' }} align="center">
                  <MessageFilled style={{ fontSize: 24 }} />
                  <span>Send A Message</span>
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
               <Form layout="vertical" autoComplete="off">
                  <Form.Item
                     label="Select Subflow"
                     name="subflow"
                     rules={[{ required: true, message: 'Please chose subflow!' }]}>
                     <Select />
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default SendAMessageMenu;
