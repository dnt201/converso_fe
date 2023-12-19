import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, notification } from 'antd';
import React from 'react';

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
   console.log(form.getFieldsValue());
   return (
      <Form
         layout="vertical"
         initialValues={{ key: item.key, value: item.value }}
         form={form}
         onFinish={(formV) => {
            let indexOf = innerNode.data.params.filter((item) => item.key === formV.key);
            if (indexOf.length > 0) {
               notification.error({ message: 'Have same key! Please use another key' });
               form.resetFields();
            } else {
               //update
               let tempListParams = innerNode.data.params.map((item) => {
                  if (item.key === formV.key)
                     return {
                        key: formV.key,
                        value: formV.value,
                     };
                  return item;
               });
               setInnerNode({ ...innerNode, data: { ...innerNode.data, params: tempListParams } });
            }
         }}>
         <div className="param-item" key={item.key}>
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
            <Space size={4}>
               <Button
                  type="text"
                  className={
                     'save' +
                     (form.getFieldValue('key') === item.key ||
                     form.getFieldValue('value') === item.value
                        ? ' disable'
                        : '')
                  }
                  disabled={
                     form.getFieldValue('key') === item.key ||
                     form.getFieldValue('value') === item.value
                  }
                  onClick={() => {
                     form.submit();
                  }}>
                  <SaveOutlined />
               </Button>
               <Button type="text" className="delete">
                  <DeleteOutlined />
               </Button>
            </Space>
         </div>
      </Form>
   );
};

export default UpdateParams;
