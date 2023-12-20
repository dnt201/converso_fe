import { DeleteOutlined, FolderAddOutlined, PlusOutlined } from '@ant-design/icons';
import { HttpRequestData } from '@pages/DetailChatBot/CustomNode/HttpRequestNode';
import { Button, Divider, Empty, Form, Input, notification } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import { Node } from 'reactflow';

import './style.less';
import { useForm } from 'antd/es/form/Form';
import UpdateHeader from './UpdateBody';
type BodyEditProps = {
   innerNode: Node<HttpRequestData>;
   setInnerNode: (node: Node<HttpRequestData>) => void;
};

const BodyEdit: React.FC<BodyEditProps> = (props) => {
   const { innerNode, setInnerNode } = props;
   const [form] = useForm();
   return (
      <div className="body-edit">
         <Divider orientation="left">
            <h5>Add new body params</h5>
         </Divider>
         <Form
            layout="vertical"
            form={form}
            onFinish={(formV) => {
               let tempListBody = innerNode.data.body;
               let indexOf = tempListBody.findIndex((item) => item.label === formV.key);
               if (indexOf >= 0) {
                  notification.error({ message: 'Have same key! Please use another key' });
               } else {
                  //add ew
                  notification.success({ message: 'Add body param success' });
                  tempListBody = tempListBody.concat({
                     label: formV.key,
                     value: formV.value,
                  });
               }
               form.resetFields();
               setInnerNode({ ...innerNode, data: { ...innerNode.data, body: tempListBody } });
            }}>
            <div className="add-form">
               <FormItem
                  style={{ flex: 2 }}
                  label="Key"
                  name="key"
                  rules={[{ required: true, message: 'Key is required!' }]}>
                  <Input placeholder="Key" />
               </FormItem>
               <FormItem
                  style={{ flex: 3 }}
                  label="Value"
                  name="value"
                  rules={[{ required: true, message: 'Value is required!' }]}>
                  <Input placeholder="Value" />
               </FormItem>
               <FormItem>
                  <Button onClick={() => form.submit()} className="button-add" type="text">
                     <PlusOutlined />
                     Add
                  </Button>
               </FormItem>
            </div>
         </Form>

         <Divider orientation="left">
            <h5>List body params</h5>
         </Divider>
         {innerNode.data.body.length <= 0 ? (
            <Empty description="No body params" />
         ) : (
            innerNode.data.body.map((item) => {
               return (
                  <UpdateHeader
                     key={item.label}
                     item={item}
                     innerNode={innerNode}
                     setInnerNode={(e) => setInnerNode(e)}
                  />
               );
            })
         )}
      </div>
   );
};

export default BodyEdit;
