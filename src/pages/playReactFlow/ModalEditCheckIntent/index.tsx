import { iOption } from '@interfaces/index';
import { Form, Input, Modal, ModalProps, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';

interface ModalEditCheckIntentProps extends ModalProps {
   dataEdge: iValueEdgePromptCollect | null;
   setDataEdge: (l: iValueEdgePromptCollect) => void;
}
export interface iValueEdgePromptCollect {
   condition: string;
   intent: string;
}

const listOption: iOption[] = [
   {
      value: 'equal',
      label: 'Equal',
   },
   {
      value: 'not-equal',
      label: 'Not equal',
   },
   {
      value: 'is-less-than',
      label: 'Is less than',
   },
   {
      value: 'is-less-than-or-equal',
      label: 'Is less than or equal',
   },
   {
      value: 'Is greater than',
      label: 'Is greater than or equal',
   },
   {
      value: 'starts-with',
      label: 'Start with',
   },
   {
      value: 'ends-with',
      label: 'Ends with',
   },
   {
      value: 'contains',
      label: 'Contains',
   },
   {
      value: 'Empty',
      label: 'Exist',
   },
];

const ModalEditCheckIntent: React.FC<ModalEditCheckIntentProps> = (props) => {
   const { dataEdge, setDataEdge, ...modalProps } = props;
   const [form] = useForm();

   const [submittable, setSubmittable] = useState(false);

   const formData = Form.useWatch([], form);

   useEffect(() => {
      setDataEdge({
         condition: form.getFieldValue('condition'),
         intent: form.getFieldValue('intent'),
      });
      form.validateFields({ validateOnly: true }).then(
         () => {
            setSubmittable(true);
         },
         () => {
            setSubmittable(false);
         }
      );
   }, [formData]);

   return (
      <Modal
         title={<h2>Check Intent</h2>}
         {...modalProps}
         okButtonProps={{ disabled: !submittable }}
         width={'50%'}
         afterClose={() => form.resetFields()}>
         <Form
            initialValues={{ condition: listOption[0].value }}
            form={form}
            layout="vertical"
            style={{ display: 'flex', gap: '16px' }}>
            <Form.Item name={'condition'} label="Condition" style={{ flex: 1 }}>
               <Select options={listOption} />
            </Form.Item>
            <Form.Item
               name={'intent'}
               label="Value"
               style={{ flex: 2 }}
               rules={[{ required: true }]}>
               <Input />
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default ModalEditCheckIntent;
