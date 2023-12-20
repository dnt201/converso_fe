import { DeleteOutlined, FolderAddOutlined, PlusOutlined } from '@ant-design/icons';
import { HttpRequestData } from '@pages/DetailChatBot/CustomNode/HttpRequestNode';
import { Button, Divider, Empty, Form, Input, notification } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import { Node } from 'reactflow';

import './style.less';
import { useForm } from 'antd/es/form/Form';
import UpdateParams from './UpdateParam';
type ParamsEditProps = {
   innerNode: Node<HttpRequestData>;
   setInnerNode: (node: Node<HttpRequestData>) => void;
};

const ParamsEdit: React.FC<ParamsEditProps> = (props) => {
   const { innerNode, setInnerNode } = props;
   const [form] = useForm();
   return (
      <div className="params-edit">
         <Divider orientation="left">
            <h5>Add new params</h5>
         </Divider>
         <Form
            layout="vertical"
            form={form}
            onFinish={(formV) => {
               let tempListParams = innerNode.data.params;
               let indexOf = tempListParams.findIndex((item) => item.key === formV.key);
               if (indexOf >= 0) {
                  notification.error({ message: 'Have same key! Please use another key' });
               } else {
                  //add new
                  tempListParams = tempListParams.concat({
                     key: formV.key,
                     value: formV.value,
                  });
                  notification.success({ message: 'Add params success' });
               }
               form.resetFields();
               setInnerNode({ ...innerNode, data: { ...innerNode.data, params: tempListParams } });
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
            <h5>List params</h5>
         </Divider>
         {innerNode.data.params.length <= 0 ? (
            <Empty description="No params" />
         ) : (
            innerNode.data.params.map((item) => {
               return (
                  <UpdateParams
                     key={item.key + item.value}
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

export default ParamsEdit;
