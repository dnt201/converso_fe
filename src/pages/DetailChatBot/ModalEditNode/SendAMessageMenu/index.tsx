import { CloseOutlined, MessageFilled } from '@ant-design/icons';
import { SendAMessageData } from '@pages/DetailChatBot/CustomNode/SendAMessageNode';
import { Button, Divider, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Node } from 'reactflow';
import './style.less';
import { useAtom } from 'jotai';
import { languagesAtom } from '@pages/DetailChatBot';
import ListUpdateMessage from './ListUpdate';
interface SendAMessageMenuProps {
   node: Node<SendAMessageData>;
   closeModal: () => void;
   setNode: (curNode: Node | null) => void;
}
const SendAMessageMenu: React.FC<SendAMessageMenuProps> = (props) => {
   const { closeModal, node, setNode } = props;
   const [innerNode, setInnerNode] = useState<Node<SendAMessageData>>(node);
   const [languages, setLanguages] = useAtom(languagesAtom);

   useEffect(() => {
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
            <div className="node-information">
               <b>Node name: </b>
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
                  defaultValue={node.data.name}
               />
            </div>
         </div>
         <div className="content">
            <Divider orientation="left">
               <h5>Response</h5>
            </Divider>
            <div className="response">
               {languages.map((item) => {
                  return (
                     <ListUpdateMessage
                        innerNode={innerNode}
                        setInnerNode={setInnerNode}
                        {...item}
                        key={item.label + item.value}
                     />
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default SendAMessageMenu;
