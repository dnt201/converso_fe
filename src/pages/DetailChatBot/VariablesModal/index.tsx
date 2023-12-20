import { PlusOutlined } from '@ant-design/icons';
import { iAttributes } from '@hooks/flow';
import {
   Button,
   Col,
   Divider,
   Empty,
   Form,
   Input,
   Modal,
   ModalProps,
   Row,
   notification,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { atom, useAtom } from 'jotai';
import React from 'react';
import UpdateVariable from './UpdateVariable';
import './style.less';
type VariableModalProps = ModalProps & {
   setShowModal: (b: boolean) => void;
};

//Attribute or variable is same thing
export const listVariableAtom = atom<iAttributes[]>([]);
const VariablesModal: React.FC<VariableModalProps> = (props) => {
   const [listVariable, setListVariable] = useAtom(listVariableAtom);
   const [form] = useForm();
   const { setShowModal, ...modalProps } = props;
   return (
      <Modal
         className="update-variable-modal"
         {...modalProps}
         title={<h2>Variable </h2>}
         onOk={() => setShowModal(false)}
         //  open={openModalVariable}
         onCancel={() => setShowModal(false)}>
         <Divider orientation="left">
            <h5>Add new variable</h5>
         </Divider>

         <Form
            form={form}
            onFinish={(formV) => {
               let tempListVariable = listVariable;

               let indexOf = listVariable.findIndex((item) => item.label === formV.label);
               if (indexOf >= 0) {
                  notification.error({
                     message: 'This label have been used! Please use another label!',
                  });
               } else {
                  //add ew
                  tempListVariable = tempListVariable.concat({
                     label: formV.label,
                     value: formV.value,
                  });
                  setListVariable(tempListVariable);
               }
               form.resetFields();
            }}>
            <Row gutter={[8, 8]}>
               <Col span={10}>
                  <FormItem
                     name={'label'}
                     rules={[{ required: true, message: 'Label is required!' }]}>
                     <Input placeholder="Label" />
                  </FormItem>
               </Col>
               <Col span={10}>
                  <FormItem
                     name={'value'}
                     rules={[{ required: true, message: 'Value is required!' }]}>
                     <Input placeholder="value" />
                  </FormItem>
               </Col>
               <Col span={4}>
                  <Button onClick={() => form.submit()}>
                     <PlusOutlined /> Add
                  </Button>
               </Col>
            </Row>
         </Form>
         <Divider orientation="left">
            <h5>List variable</h5>
         </Divider>
         <div className="list-variable">
            {listVariable.length <= 0 ? (
               <Empty />
            ) : (
               listVariable.map((item) => {
                  return <UpdateVariable item={item} key={item.label} />;
               })
            )}
         </div>
      </Modal>
   );
};

export default VariablesModal;
