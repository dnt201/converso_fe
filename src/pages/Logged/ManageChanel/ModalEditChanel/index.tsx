import { useEditChanel } from '@hooks/chanel/editChanel';
import { iChanel } from '@hooks/chanel/myListChanel';
import { Form, Input, Modal, ModalProps, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
type ModalEditChanelProps = ModalProps & {
   setCloseModal: () => void;
   chanelProps: iChanel | undefined;
};

const ModalEditChanel: React.FC<ModalEditChanelProps> = (props) => {
   const { setCloseModal, chanelProps, ...modalProps } = props;
   const [formEditChanel] = useForm();
   const initFormValue: iChanel = chanelProps;
   const editChanel = useEditChanel(chanelProps?.id ?? -1);

   return (
      <Modal
         {...modalProps}
         onCancel={() => setCloseModal()}
         title="Edit Chanel"
         className="modal-edit-chanel"
         okButtonProps={{ loading: editChanel.isLoading }}
         onOk={() => {
            formEditChanel.submit();
         }}>
         <Form<iChanel>
            initialValues={initFormValue}
            layout="vertical"
            form={formEditChanel}
            onFinish={(form) => editChanel.mutate(form)}>
            <Form.Item name="contactName" required label="Contact name">
               <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  placeholder={`Enter contact name`}
               />
            </Form.Item>
            <Form.Item name="flowId" required label="Chose Flow reference">
               <Select placeholder={'Select flow'} />
            </Form.Item>
            <Form.Item name="credentials" required label="Credentials">
               <Input.TextArea
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  placeholder="Enter credentials"
               />
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default ModalEditChanel;
