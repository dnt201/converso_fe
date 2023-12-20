import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Space, notification } from 'antd';
import React, { useState } from 'react';

import './style.less';
import FormItem from 'antd/es/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import { Node } from 'reactflow';
import { HttpRequestData } from '@pages/DetailChatBot/CustomNode/HttpRequestNode';
interface UpdateBodyProps {
   item: { label: string; value: string | number };
   innerNode: Node<HttpRequestData>;
   setInnerNode: (node: Node<HttpRequestData>) => void;
}
const UpdateBody: React.FC<UpdateBodyProps> = (props) => {
   const { item, innerNode, setInnerNode } = props;
   const [form] = useForm();
   const [curItem, setCurItem] = useState(item);

   return (
      <Form
         layout="vertical"
         initialValues={{ key: item.label, value: item.value }}
         form={form}
         onFinish={(formV) => {
            let indexOf = innerNode.data.body.filter((i) => item.label === formV.key);
            if (
               (item.label === formV.key && indexOf.length >= 2) ||
               (item.label !== formV.key && indexOf.length >= 1)
            ) {
               notification.error({ message: 'Have same key! Please use another key' });
               form.resetFields();
            } else {
               //update
               let tempListBody = innerNode.data.body.map((i) => {
                  if (i.label === item.label)
                     return {
                        label: formV.key,
                        value: formV.value,
                     };
                  return i;
               });
               setInnerNode({ ...innerNode, data: { ...innerNode.data, body: tempListBody } });
               notification.success({ message: 'Update body params success' });
            }
         }}>
         <div className="param-item" key={item.label}>
            <FormItem
               style={{ flex: 2 }}
               label="Key"
               name="key"
               rules={[{ required: true, message: 'Key is required!' }]}>
               <Input
                  placeholder="Key"
                  onChange={(e) => setCurItem({ ...curItem, label: e.target.value })}
               />
            </FormItem>
            <FormItem
               style={{ flex: 3 }}
               label="Value"
               name="value"
               rules={[{ required: true, message: 'Value is required!' }]}>
               <Input
                  placeholder="Value"
                  onChange={(e) => setCurItem({ ...curItem, value: e.target.value })}
               />
            </FormItem>
            <Space size={4}>
               <Button
                  type="text"
                  className={
                     'save' +
                     (curItem.label === item.label && curItem.value === item.value
                        ? ' disable'
                        : '')
                  }
                  disabled={curItem.label === item.label && curItem.value === item.value}
                  onClick={() => {
                     form.submit();
                  }}>
                  <SaveOutlined />
               </Button>

               <Popconfirm
                  title="Delete this body params?"
                  onConfirm={() => {
                     let tempListBody = innerNode.data.body.filter((n) => n.label !== item.label);
                     setInnerNode({
                        ...innerNode,
                        data: { ...innerNode.data, body: tempListBody },
                     });
                     notification.success({ message: 'Delete body param success' });
                  }}>
                  <Button type="text" className="delete">
                     <DeleteOutlined />
                  </Button>
               </Popconfirm>
            </Space>
         </div>
      </Form>
   );
};

export default UpdateBody;
