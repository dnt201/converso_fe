import { BuildFilled, CloseOutlined } from '@ant-design/icons';
import { CheckVariableData } from '@pages/DetailChatBot/CustomNode/CheckVariable';
import { listVariableAtom } from '@pages/DetailChatBot/VariablesModal';
import { Button, Form, Input, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Node } from 'reactflow';

interface CheckVariableMenuProps {
   node: Node<CheckVariableData>;
   closeModal: () => void;
   setNode: (curNode: Node | null) => void;
}
const CheckVariableMenu: React.FC<CheckVariableMenuProps> = (props) => {
   const { node, closeModal, setNode } = props;
   const [innerNode, setInnerNode] = useState<Node<CheckVariableData>>(node);
   const [form] = useForm();
   const [listVariable] = useAtom(listVariableAtom);

   useEffect(() => {
      setNode(innerNode);
   }, [innerNode]);
   return (
      <div className="edit-mode-subflow" onClick={(e) => e.preventDefault()}>
         <div className="node-header">
            <div className="top">
               <Space style={{ fontSize: 18, color: 'var(--color-main-blue)' }} align="center">
                  <BuildFilled style={{ fontSize: 24 }} />
                  <span>Check Variable</span>
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
               <Form
                  layout="vertical"
                  autoComplete="off"
                  form={form}
                  onFinish={(formValue) => {}}
                  initialValues={{ variable: innerNode.data.attribute }}>
                  <Form.Item
                     label="Select variable"
                     name="variable"
                     rules={[{ required: true, message: 'Please chose variable!' }]}>
                     <Select
                        options={listVariable.map((item) => item)}
                        onSelect={(v, b) => {
                           setInnerNode((pre) => {
                              return { ...pre, data: { ...pre.data, attribute: b.label } };
                           });
                        }}
                        placeholder="Select variable"
                        // options={transformOption(data?.data, id)}
                     />
                  </Form.Item>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default CheckVariableMenu;
