import { Form, Input, Modal, ModalProps, Select } from 'antd';
import React, { useState } from 'react';
import './style.less';
import { useForm } from 'antd/es/form/Form';
import { iChanel, iMessengerCredentials } from '@hooks/chanel/myListChanel';
import { useCreateChanel } from '@hooks/chanel/createChannel';
type ModalAddChanelProps = ModalProps & { setCloseModal: (b: boolean) => void; flows: any[] };

const ChannelTypes = [
   { value: 1, label: 'Web' },
   { value: 2, label: 'Messenger' },
   { value: 3, label: 'Line' },
];

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

const ModalAddChanel: React.FC<ModalAddChanelProps> = (props) => {
   const { setCloseModal, flows, ...modalProps } = props;
   const [formAddChanel] = useForm();
   const [type, setType] = useState(1);
   const createChanel = useCreateChanel();
   const renderCredentialsForm = () => {
      if (type == 2) return <MessengerCredentials />;
      if (type == 3) return <LineCredentials />;
      return <i>Not need credentials</i>;
   };

   return (
      <Modal
         {...modalProps}
         onCancel={() => setCloseModal(false)}
         onOk={() => {
            formAddChanel.submit();
         }}
         afterClose={() => {
            formAddChanel.resetFields();
         }}
         title="Add New Chanel"
         className="modal-add-chanel">
         <Form<
            Pick<
               iChanel,
               | 'contactId'
               | 'contactName'
               | 'flowId'
               | 'credentials'
               | 'channelTypeId'
               | 'PageToken'
               | 'WebhookSecret'
            >
         >
            layout="vertical"
            initialValues={{ channelTypeId: type }}
            form={formAddChanel}
            onFinish={(form) =>
               createChanel.mutate(form, {
                  onSuccess: () => {
                     setCloseModal(false);
                  },
               })
            }>
            <Form.Item
               name="contactId"
               label="Contact ID"
               rules={[{ message: 'This filed is required!', required: true }]}>
               <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  placeholder={`Enter contact id`}
               />
            </Form.Item>
            <Form.Item
               name="contactName"
               label="Contact name"
               rules={[{ message: 'This filed is required!', required: true }]}>
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
            <Form.Item
               name="channelTypeId"
               label="Provider"
               rules={[{ message: 'This filed is required!', required: true }]}>
               <Select placeholder={'Select provider'} onSelect={(val) => setType(val)}>
                  {ChannelTypes.map((e) => {
                     return <Select.Option value={e.value}>{e.label}</Select.Option>;
                  })}
               </Select>
            </Form.Item>
            <h2>Credentials</h2>
            {renderCredentialsForm()}
         </Form>
      </Modal>
   );
};

export default ModalAddChanel;
