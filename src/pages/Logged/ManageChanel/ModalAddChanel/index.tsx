import { Form, Input, Modal, ModalProps, Select } from 'antd';
import React, { useState } from 'react';
import './style.less';
import { useForm } from 'antd/es/form/Form';
import { iChanel, iMessengerCredentials } from '@hooks/chanel/myListChanel';
import { useCreateChanel } from '@hooks/chanel/createChannel';
type ModalAddChanelProps = ModalProps & { setCloseModal: (b: boolean) => void };

const ChannelTypes = [
   { value: 1, label: 'Web' },
   { value: 2, label: 'Messenger' },
   { value: 3, label: 'Line' },
];

const MessengerCredentials: React.FC<iMessengerCredentials> = () => {
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

const ModalAddChanel: React.FC<ModalAddChanelProps> = (props) => {
   const { setCloseModal, ...modalProps } = props;
   const [formAddChanel] = useForm();
   const [type, setType] = useState(1);
   const createChanel = useCreateChanel();

   const renderCredentialsForm = () => {
      if (type == 2) return <MessengerCredentials />;

      return <></>;
   };

   return (
      <Modal
         {...modalProps}
         onCancel={() => setCloseModal(false)}
         onOk={() => {
            formAddChanel.submit();
         }}
         title="Add New Chanel"
         className="modal-add-chanel">
         <Form<
            Pick<iChanel, 'contactId' | 'contactName' | 'flowId' | 'credentials' | 'channelTypeId'>
         >
            layout="vertical"
            form={formAddChanel}
            onFinish={(form) => createChanel.mutate(form)}>
            <Form.Item name="contactId" required label="Contact ID">
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
            <Form.Item name="channelTypeId" required label="Provider">
               <Select
                  placeholder={'Select provider'}
                  defaultValue={type}
                  onSelect={(val) => setType(val)}>
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
