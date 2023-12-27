import { iIntent, iIntentDetail } from '@hooks/intent';
import { Button, Divider, Form, Input, Modal, ModalProps, Space, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react';
import ListIntent from './ListUpdateIntent';
import { FileAddFilled, PlusOutlined } from '@ant-design/icons';
import { useCreateIntent } from '@hooks/intent/createIntent';

type ModalEditTrainingProps = ModalProps & {
   setCloseModal: () => void;
   currentIntent?: iIntent;
};

const ModalEditTraining: React.FC<ModalEditTrainingProps> = (props) => {
   const { currentIntent, setCloseModal, ...propsModal } = props;
   if (!currentIntent) return null;

   const [formEditTraining] = useForm();

   let tempList = JSON.parse(currentIntent.intents) as iIntentDetail[];
   const [listIntent, setListIntent] = useState<iIntentDetail[]>(
      tempList.map((item) => {
         return { ...item, curId: crypto.randomUUID().toString() };
      })
   );
   const nameFormValue = Form.useWatch(['name'], formEditTraining);

   const createTraining = useCreateIntent();

   return (
      <Modal
         width={'50vw'}
         maskClosable={false}
         title="Modal Edit Training"
         onOk={() => formEditTraining.submit()}
         {...propsModal}
         okButtonProps={{
            disabled: !(nameFormValue?.toString().length > 0),
            loading: createTraining.isLoading,
         }}
         onCancel={() => setCloseModal()}>
         <Form<iIntent>
            onFinish={(form) => {
               createTraining.mutate(
                  {
                     name: form.name,
                     intents: listIntent.filter((intent) => {
                        if (intent.intent.length > 0) {
                           let tempP = intent.prompts.filter((item) => item.length > 0);
                           console.log(tempP);
                           return {
                              intent: intent.intent,
                              prompts: tempP,
                           };
                        }
                     }),
                     refId: currentIntent.referenceId,
                  },
                  {
                     onSuccess: () => {
                        notification.success({ message: 'Edit training success!' });
                        setCloseModal();
                     },
                  }
               );
            }}
            initialValues={{ ...currentIntent }}
            layout="vertical"
            form={formEditTraining}>
            <FormItem
               name={'name'}
               label={'Name'}
               rules={[{ message: 'This filed is required!', required: true }]}>
               <Input placeholder="Enter training name!" />
            </FormItem>
            <Divider style={{ margin: '4px 0px' }} orientation="left">
               <h5>List Intents</h5>
            </Divider>

            <Button
               style={{ marginBottom: 8 }}
               type="primary"
               onClick={() => setListIntent([...listIntent, { intent: '', prompts: [] }])}>
               <PlusOutlined />
               Add Intent
            </Button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
               {listIntent.map((item, i) => {
                  return (
                     <ListIntent
                        key={crypto.randomUUID()}
                        curIndex={i}
                        listIntent={listIntent}
                        setListIntent={(list) => setListIntent(list)}
                     />
                  );
               })}
            </div>
         </Form>
      </Modal>
   );
};

export default ModalEditTraining;
