import React, { useEffect, useState } from 'react';
import { Node } from 'reactflow';

import { Button, Form, Input, Select, Skeleton, Space } from 'antd';
import { ApiOutlined, CloseOutlined } from '@ant-design/icons';
import { SubFlowData } from '@pages/DetailChatBot/CustomNode/SubFlowNode/indext';
type tKeyTab = 'general' | 'settings' | 'grammar';
import './style.less';
import { useParams } from 'react-router-dom';
import { useMyListFlow, useMyListFlowOptions } from '@hooks/flow/myListFlow';
import { iFlow } from '@hooks/flow';
import { useForm } from 'antd/es/form/Form';

interface SubflowMenuProps {
   node: Node<SubFlowData>;
   closeModal: () => void;
   setNode: (curNode: Node | null) => void;
}
// interface SubflowMenuProps {
//    chatbotResponse: string;
// }

const SubflowMenu: React.FC<SubflowMenuProps> = (props) => {
   const { id } = useParams();

   const { closeModal, node, setNode } = props;
   const [innerNode, setInnerNode] = useState<Node<SubFlowData>>(node);
   const [form] = useForm();
   const { data, isLoading } = useMyListFlowOptions();
   useEffect(() => {
      //   console.log(innerNode.data.text);
      setNode(innerNode);
   }, [innerNode]);
   console.log(innerNode);
   useEffect(() => {
      form.setFieldsValue({
         subflow: innerNode.data.flowId,
      });
   }, []);
   return (
      <div className="edit-mode-subflow" onClick={(e) => e.preventDefault()}>
         <div className="node-header">
            <div className="top">
               <Space style={{ fontSize: 18, color: 'var(--color-main-blue)' }} align="center">
                  <ApiOutlined style={{ fontSize: 24 }} />
                  <span>Subflow</span>
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
            <div className="response">
               {isLoading ? (
                  <Skeleton.Input active />
               ) : (
                  <Form
                     layout="vertical"
                     autoComplete="off"
                     form={form}
                     onFinish={(formValue) => {}}>
                     <Form.Item
                        label="Select Subflow"
                        name="subflow"
                        rules={[{ required: true, message: 'Please chose subflow!' }]}>
                        <Select
                           onSelect={(v) => {
                              console.log('set');
                              setInnerNode((pre) => {
                                 return { ...pre, data: { ...pre.data, flowId: v } };
                              });
                           }}
                           loading={data?.data === undefined || isLoading}
                           placeholder="Select subflow"
                           options={transformOption(data?.data, id)}
                        />
                     </Form.Item>
                  </Form>
               )}
            </div>
         </div>
      </div>
   );
};

const transformOption = (data: iFlow[], id: string) => {
   if (data === undefined) return [];
   let temp = data.filter((item) => item.id.toString() !== id.toString());
   console.log(temp);
   return temp.map((item) => {
      return {
         value: item.id,
         label: item.name,
      };
   });
};


export default SubflowMenu;
