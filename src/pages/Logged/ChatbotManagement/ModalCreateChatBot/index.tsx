import { RobotFilled } from '@ant-design/icons';
import { ChatBotLogo } from '@assets/icons';
import { iFlowParams } from '@hooks/flow';
import { useCreateFollow } from '@hooks/flow/createFlow';
import { Form, Input, Modal, ModalProps, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';

type ModalCreateChatBotProps = ModalProps & {
   setOpenModal: (b: boolean) => void;
};
const ModalCreateChatBot: React.FC<ModalCreateChatBotProps> = (props) => {
   const { setOpenModal, ...modalProps } = props;
   const [form] = useForm<iFlowParams>();
   const createFollow = useCreateFollow();

   const formFinish = (formValue: iFlowParams) => {
      createFollow.mutate(formValue, {
         onSuccess: () => {
            setOpenModal(false);
         },
      });
   };
   return (
      <Modal
         title={
            <Space size={4} align="center">
               <RobotFilled style={{ color: 'var(--color-main-blue)', fontSize: 24 }} />
               <h2>Create Flow</h2>
            </Space>
         }
         {...modalProps}
         onCancel={() => {
            setOpenModal(false);
         }}
         onOk={() => form.submit()}
         okButtonProps={{ loading: createFollow.isLoading }}>
         <Form<iFlowParams>
            form={form}
            layout="vertical"
            onFinish={(f) => {
               formFinish(f);
            }}>
            <FormItem
               name="flowType"
               label="Flow type"
               rules={[{ required: true, message: 'Please select type of flow!' }]}>
               <Select options={[{ label: 'Message', value: 'MSG' }]} placeholder="Select type" />
            </FormItem>
            <FormItem
               name="name"
               label="Flow name"
               rules={[{ required: true, message: 'Please fill name of flow!' }]}>
               <Input placeholder="Enter flow name" />
            </FormItem>
         </Form>
      </Modal>
   );
};

export default ModalCreateChatBot;
