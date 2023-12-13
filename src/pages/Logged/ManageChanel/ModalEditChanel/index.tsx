import { useEditChanel } from '@hooks/chanel/editChanel';
import { iChanel } from '@hooks/chanel/myListChanel';
import { Form, Input, Modal, ModalProps, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
type ModalEditChanelProps = ModalProps & {
   setCloseModal: () => void;
   chanelProps: iChanel | undefined;
};

const MessengerCredentials: React.FC<any> = () => {
   return (
      <>
         <Form.Item name="PageToken" label="Page Token">
            <Input.TextArea autoSize={{ minRows: 1, maxRows: 2 }} placeholder="Enter Page token" />
         </Form.Item>
         <Form.Item name="WebhookSecret" label="Secret">
            <Input.TextArea autoSize={{ minRows: 1, maxRows: 2 }} placeholder="Enter your Secret" />
         </Form.Item>
      </>
   );
};

const LineCredentials: React.FC<any> = () => {
   return (
      <>
         <Form.Item name="LineToken" label="Line Access Token">
            <Input.TextArea
               autoSize={{ minRows: 1, maxRows: 2 }}
               placeholder="Enter Line Access Token"
            />
         </Form.Item>
      </>
   );
};

const ModalEditChanel: React.FC<ModalEditChanelProps> = (props) => {
   const { setCloseModal, chanelProps, ...modalProps } = props;
   const { channelTypeId, credentials, contactId, contactName, flowId, id } = chanelProps || {};
   const [formEditChanel] = useForm();
   const initFormValue: iChanel = chanelProps;
   console.log(chanelProps);
   const editChanel = useEditChanel();

   useEffect(() => {
      let cres = credentials;

      if (credentials && typeof credentials == 'string') {
         try {
            cres = JSON.parse(credentials);
         } catch (e) {
            console.log('Can not parse credentials: ' + e.message);
         }
      }

      // const { PageToken, WebhookSecret, LineToken } = cres || {};

      formEditChanel.setFieldValue('id', id);
      formEditChanel.setFieldValue('contactId', contactId);
      formEditChanel.setFieldValue('contactName', contactName);
      formEditChanel.setFieldValue('flowId', flowId);

      // formEditChanel.setFieldValue('PageToken', PageToken);
      // formEditChanel.setFieldValue('WebhookSecret', WebhookSecret);
      // formEditChanel.setFieldValue('channelTypeId', channelTypeId);
      // formEditChanel.setFieldValue('LineToken', LineToken);
   }, [formEditChanel, chanelProps]);

   const renderCredentialsForm = () => {
      if (!chanelProps) return <></>;

      if (chanelProps?.channelTypeId == 2) return <MessengerCredentials />;

      if (chanelProps?.channelTypeId == 3) return <LineCredentials />;

      return <></>;
   };

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
            onFinish={(form) => {
               console.log(form, '-----');
               editChanel.mutate(form, {
                  onSuccess: () => {
                     setCloseModal();
                  },
               });
            }}>
            <Form.Item name="id" style={{ display: 'none' }}>
               <Input />
            </Form.Item>
            <Form.Item name="contactId" required label="Contact id">
               <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  placeholder={`Enter contact id`}
               />
            </Form.Item>
            <Form.Item name="contactName" required label="Contact name">
               <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  placeholder={`Enter contact name`}
               />
            </Form.Item>
            <Form.Item name="flowId" label="Flow reference">
               <Select placeholder={'Select flow'} />
            </Form.Item>
            <h2>Credentials</h2>
            {renderCredentialsForm()}
         </Form>
      </Modal>
   );
};

export default ModalEditChanel;
