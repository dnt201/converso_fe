import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Space, notification } from 'antd';
import React, { useState } from 'react';

import './style.less';
import FormItem from 'antd/es/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import { Node } from 'reactflow';
import { HttpRequestData } from '@pages/DetailChatBot/CustomNode/HttpRequestNode';
interface UpdateParamsProps {
   item: { key: string; value: string | number };
   innerNode: Node<HttpRequestData>;
   setInnerNode: (node: Node<HttpRequestData>) => void;
}
const UpdateParams: React.FC<UpdateParamsProps> = (props) => {
   const { item, innerNode, setInnerNode } = props;
   const [form] = useForm();
   const [curItem, setCurItem] = useState(item);

   return (
      <Form
         layout="vertical"
         initialValues={{ key: item.key, value: item.value }}
         form={form}
         onFinish={(formV) => {
            let indexOf = innerNode.data.params.filter((item) => item.key === formV.key);

            if (
               (item.key === formV.key && indexOf.length >= 2) ||
               (item.key !== formV.key && indexOf.length >= 1)
            ) {
               notification.error({ message: 'Have same key! Please use another key' });
               form.resetFields();
            } else {
               //update
               let tempListParams = innerNode.data.params.map((i) => {
                  if (i.key === item.key)
                     return {
                        key: formV.key,
                        value: formV.value,
                     };
                  return i;
               });
               setInnerNode({ ...innerNode, data: { ...innerNode.data, params: tempListParams } });
               notification.success({ message: 'Update params success' });
            }
         }}>
         <div className="param-item" key={item.key}>
            <FormItem
               style={{ flex: 2 }}
               label="Key"
               name="key"
               rules={[{ required: true, message: 'Key is required!' }]}>
               <Input
                  placeholder="Key"
                  onChange={(e) => setCurItem({ ...curItem, key: e.target.value })}
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
                     (curItem.key === item.key && curItem.value === item.value ? ' disable' : '')
                  }
                  disabled={curItem.key === item.key && curItem.value === item.value}
                  onClick={() => {
                     form.submit();
                  }}>
                  <SaveOutlined />
               </Button>
               <Popconfirm
                  title="Delete this params?"
                  onConfirm={() => {
                     let tempListParams = innerNode.data.params.filter((n) => n.key !== item.key);
                     setInnerNode({
                        ...innerNode,
                        data: { ...innerNode.data, params: tempListParams },
                     });
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

export default UpdateParams;
