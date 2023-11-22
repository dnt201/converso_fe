import { PromptCollectData } from '@pages/PlayReactFlow/CustomNode/PromptCollectNode';
import React, { useEffect, useState } from 'react';
import { Node } from 'reactflow';

import { useForm } from 'antd/es/form/Form';
import { Button, Form, Input, Select, Space } from 'antd';
import { ApiOutlined, CloseOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import { SubFlowData } from '@pages/PlayReactFlow/CustomNode/SubFlowNode/indext';
type tKeyTab = 'general' | 'settings' | 'grammar';
import './style.less';

interface SubflowMenuProps {
   promptCollect: Node<SubFlowData>;
   closeModal: () => void;
   setNode: (curNode: Node | null) => void;
}
// interface SubflowMenuProps {
//    chatbotResponse: string;
// }

const fakeList = ['Hello', '12412412', 'aaaa', 'bbbb'];
const SubflowMenu: React.FC<SubflowMenuProps> = (props) => {
   const { closeModal, promptCollect, setNode } = props;
   const [innerNode, setInnerNode] = useState<Node<SubFlowData>>(promptCollect);

   useEffect(() => {
      //   console.log(innerNode.data.text);
      setNode(innerNode);
   }, [innerNode]);

   return (
      <div className="edit-mode-subflow" onClick={(e) => e.preventDefault()}>
         <div className="node-header">
            <div className="top">
               <Space style={{ fontSize: 18, color: 'var(--color-main-blue)' }} align="center">
                  <ApiOutlined style={{ fontSize: 24 }} />
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

export default SubflowMenu;
