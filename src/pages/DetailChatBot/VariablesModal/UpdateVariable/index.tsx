import { iAttributes } from '@hooks/flow';
import { Button, Form, Input, Popconfirm, Space, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { listVariableAtom } from '..';
import FormItem from 'antd/es/form/FormItem';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';

interface UpdateVariable {
   item: iAttributes;
}

const UpdateVariable: React.FC<UpdateVariable> = (props) => {
   const { item } = props;
   const [form] = useForm();
   const [curItem, setCurItem] = useState<iAttributes>(item);
   const [listVariable, setListVariable] = useAtom(listVariableAtom);

   return (
      <Form
         layout="vertical"
         initialValues={{ label: item.label, value: item.value }}
         form={form}
         onFinish={(formV) => {
            let indexOf = listVariable.filter((i) => item.label === formV.label);
            if (
               (item.label === formV.label && indexOf.length >= 2) ||
               (item.label !== formV.label && indexOf.length >= 1)
            ) {
               notification.error({ message: 'Have same key! Please use another key' });
               form.resetFields();
            } else {
               //update
               let tempListVariable = listVariable.map((i) => {
                  if (i.label === item.label)
                     return {
                        label: formV.label,
                        value: formV.value,
                     };
                  return i;
               });
               setListVariable(tempListVariable);
               notification.success({ message: 'Update variable success' });
            }
         }}>
         <div className="param-item" key={item.label}>
            <FormItem
               style={{ flex: 2 }}
               label="Label"
               name="label"
               rules={[{ required: true, message: 'Key is required!' }]}>
               <Input
                  placeholder="Label"
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
                  title="Delete this variable?"
                  onConfirm={() => {
                     let tempListVariable = listVariable.filter((n) => n.label !== item.label);
                     setListVariable(tempListVariable);
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

export default UpdateVariable;
