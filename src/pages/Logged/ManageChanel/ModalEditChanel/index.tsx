import { useEditChanel } from '@hooks/chanel/editChanel';
import { iChanel } from '@hooks/chanel/myListChanel';
import { Button, Form, Input, Modal, ModalProps, Select, Space, Tooltip, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { text } from 'stream/consumers';
type ModalEditChanelProps = ModalProps & {
   setCloseModal: () => void;
   chanelProps?: iChanel;
   flows: any[];
};

const MessengerCredentials: React.FC<any> = () => {
   return (
      <>
         <Form.Item
            name="PageToken"
            label="Page Token"
            rules={[{ message: 'This filed is required!', required: true }]}>
            <Input.TextArea autoSize={{ minRows: 1, maxRows: 2 }} placeholder="Enter Page token" />
         </Form.Item>
         <Form.Item
            name="WebhookSecret"
            label="Secret"
            rules={[{ message: 'This filed is required!', required: true }]}>
            <Input.TextArea autoSize={{ minRows: 1, maxRows: 2 }} placeholder="Enter your Secret" />
         </Form.Item>
      </>
   );
};

const LineCredentials: React.FC<any> = () => {
   return (
      <>
         <Form.Item
            name="LineToken"
            label="Line Access Token"
            rules={[{ message: 'This filed is required!', required: true }]}>
            <Input.TextArea
               autoSize={{ minRows: 1, maxRows: 2 }}
               placeholder="Enter Line Access Token"
            />
         </Form.Item>
      </>
   );
};

const ModalEditChanel: React.FC<ModalEditChanelProps> = (props) => {
   const { setCloseModal, chanelProps, flows, ...modalProps } = props;
   const { channelTypeId, credentials, contactId, contactName, flowId, id } = chanelProps || {};
   const [formEditChanel] = useForm();
   const initFormValue: iChanel = chanelProps;
   const editChanel = useEditChanel();
   useEffect(() => {
      let cres = credentials;

      if (credentials && typeof credentials == 'string') {
         try {
            cres = JSON.parse(credentials);
         } catch (e) {}
      }

      const { PageToken, WebhookSecret, LineToken } = cres || {};

      formEditChanel.setFieldValue('id', id);
      formEditChanel.setFieldValue('contactId', contactId);
      formEditChanel.setFieldValue('contactName', contactName);
      formEditChanel.setFieldValue('flowId', flowId);

      formEditChanel.setFieldValue('PageToken', PageToken);
      formEditChanel.setFieldValue('WebhookSecret', WebhookSecret);
      formEditChanel.setFieldValue('channelTypeId', channelTypeId);
      formEditChanel.setFieldValue('LineToken', LineToken);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [formEditChanel, chanelProps]);

   const renderCredentialsForm = () => {
      if (!chanelProps) return <></>;

      if (chanelProps?.channelTypeId == 2) return <MessengerCredentials />;

      if (chanelProps?.channelTypeId == 3) return <LineCredentials />;

      return <></>;
   };
   const handleCopyClick = async (text) => {
      try {
         await navigator.clipboard.writeText(text);
         notification.success({ message: 'Copied to clipboard!' });
      } catch (err) {
         console.error('Unable to copy to clipboard.', err);
         notification.success({ message: 'Copy to clipboard failed!' });
      }
   };

   return (
      <Modal
         {...modalProps}
         onCancel={() => setCloseModal()}
         title="Edit Channel"
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
            <Form.Item name="channelTypeId" required hidden label=""></Form.Item>
            <Form.Item name="contactName" required label="Contact name">
               <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  placeholder={`Enter contact name`}
               />
            </Form.Item>
            <Form.Item
               name="flowId"
               label="Flow reference"
               rules={[{ message: 'This filed is required!', required: true }]}>
               <Select
                  placeholder={'Select flow'}
                  options={
                     (flows &&
                        flows.map((e) => {
                           return { value: e.id, label: e.name };
                        })) ||
                     []
                  }
               />
            </Form.Item>
            {chanelProps && chanelProps.channelTypeId === 1 ? (
               <>
                  <Input
                     disabled
                     style={{ marginBottom: 8 }}
                     value={`<script src="https://converso.site/script/chatbot" channelId="${chanelProps.contactId}"></script>`}
                  />
                  <Tooltip title="Click to copy script!">
                     <Button
                        style={{ width: '100%' }}
                        onClick={() => {
                           const script = `<script src="https://converso.site/script/chatbot" channelId="${chanelProps.contactId}"></script>`;
                           handleCopyClick(script);
                        }}>
                        Copy script
                     </Button>
                  </Tooltip>
               </>
            ) : (
               <>
                  <h2>Credentials</h2>
                  {renderCredentialsForm()}
               </>
            )}
         </Form>
      </Modal>
   );
};

export default ModalEditChanel;
