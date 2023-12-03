import { Form, Input, Modal, ModalProps, Select } from 'antd';
import React from 'react';
import './style.less';
import { useForm } from 'antd/es/form/Form';
import { iChanel } from '@hooks/chanel/myListChanel';
type ModalAddChanelProps = ModalProps & { setCloseModal: (b: boolean) => void };

const ModalAddChanel: React.FC<ModalAddChanelProps> = (props) => {
   const { setCloseModal, ...modalProps } = props;
   const [formAddChanel] = useForm();
   return (
      <Modal
         {...modalProps}
         onCancel={() => setCloseModal(false)}
         title="Add New Chanel"
         className="modal-add-chanel">
         <Form<Pick<iChanel, 'contactName' | 'flowId' | 'credentials'>>
            layout="vertical"
            form={formAddChanel}>
            <Form.Item name="contactName" required label="Contact name">
               <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 2 }}
                  placeholder={`Enter contact name`}
               />
            </Form.Item>
            <Form.Item name="flowId" required label="Flow reference">
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

export default ModalAddChanel;
