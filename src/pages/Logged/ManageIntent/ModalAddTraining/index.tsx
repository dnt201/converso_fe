import { Form, Input, Modal, ModalProps, Select, notification } from 'antd';
import React, { useState } from 'react';
import './style.less';
import { useForm } from 'antd/es/form/Form';
import { iChanel, iMessengerCredentials } from '@hooks/chanel/myListChanel';
import { useCreateIntent } from '@hooks/intent/createIntent';
import { iIntent, iIntentCreate } from '@hooks/intent';
type ModalAddTrainingProps = ModalProps & { setCloseModal: (b: boolean) => void };

const ModalAddTraining: React.FC<ModalAddTrainingProps> = (props) => {
   const { setCloseModal, ...modalProps } = props;
   const [formAddTraining] = useForm();
   const createTraining = useCreateIntent();

   return (
      <Modal
         {...modalProps}
         onCancel={() => setCloseModal(false)}
         onOk={() => {
            formAddTraining.submit();
         }}
         afterClose={() => {
            formAddTraining.resetFields();
         }}
         okButtonProps={{ loading: createTraining.isLoading }}
         title="Add New Intent"
         className="modal-add-intent">
         <Form<iIntentCreate>
            layout="vertical"
            initialValues={{}}
            form={formAddTraining}
            onFinish={(form) =>
               createTraining.mutate(
                  { name: form.name, intents: [], refId: crypto.randomUUID() },
                  {
                     onSuccess: () => {
                        notification.success({ message: 'Add new training success!' });
                        setCloseModal(false);
                     },
                  }
               )
            }>
            <Form.Item
               name="name"
               label="Name"
               rules={[{ message: 'This filed is required!', required: true }]}>
               <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  placeholder={`Enter training name...`}
               />
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default ModalAddTraining;
