import { iOption } from '@interfaces/index';
import { Button, Form, Input, Modal, ModalProps, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { PromptCollectData } from '../../CustomNode/PromptCollectNode';
import { Edge, Node } from 'reactflow';
import { ListEdgeType } from '../indext';
import { findOptionByValue } from '@utils/index';

interface ModalEditCheckIntentProps extends ModalProps {
   edge: Edge<ListEdgeType> | null;
   edges: Edge[];
   setEdges: (edges: any) => void;
   setShowModal: (b: boolean) => void;
}
export interface iValueEdgePromptCollect {
   condition: string;
   intent: string;
}

const listOptionTrue: iOption[] = [
   {
      value: 'equal',
      label: 'Equal',
   },
   {
      value: 'not-equal',
      label: 'Not equal',
   },
   {
      value: 'is-less-than',
      label: 'Is less than',
   },
   {
      value: 'is-less-than-or-equal',
      label: 'Is less than or equal',
   },
   {
      value: 'Is greater than',
      label: 'Is greater than or equal',
   },
   {
      value: 'starts-with',
      label: 'Start with',
   },
   {
      value: 'ends-with',
      label: 'Ends with',
   },
   {
      value: 'contains',
      label: 'Contains',
   },
   {
      value: 'Empty',
      label: 'Exist',
   },
];

const listOptionFalse: iOption[] = [
   {
      value: 'else',
      label: 'Else',
   },
];

const ModalEditCheckIntent: React.FC<ModalEditCheckIntentProps> = (props) => {
   const { edge, edges, setEdges, setShowModal, ...modalProps } = props;
   const [form] = useForm();
   const [submittable, setSubmittable] = useState(false);
   const formData = Form.useWatch([], form);
   const [label, setLabel] = useState(
      edge
         ? edge.sourceHandle === 'prompt-and-collect-false'
            ? listOptionFalse[0].label
            : listOptionTrue[0].label
         : listOptionTrue[0].label
   );
   const deleteEdgeById = (id: string) => {
      setEdges(edges.filter((edge) => edge.id !== id));
   };
   let defaultValueSelect: string = '';
   if (edge)
      if (edge.sourceHandle === 'prompt-and-collect-false') {
         defaultValueSelect =
            edge.data?.condition && edge.data?.condition !== ''
               ? findOptionByValue(edge.data.condition, listOptionFalse)?.value ?? ''
               : listOptionFalse[0].value;
      } else {
         defaultValueSelect =
            edge.data?.condition && edge.data?.condition !== ''
               ? findOptionByValue(edge.data.condition, listOptionTrue)?.value ?? ''
               : listOptionTrue[0].value;
      }
   useEffect(() => {
      form.setFieldValue('intent', edge?.data?.intent);
   }, []);

   useEffect(() => {
      form.validateFields({ validateOnly: true }).then(
         () => {
            setSubmittable(true);
         },
         () => {
            setSubmittable(false);
         }
      );
   }, [formData]);

   if (edge === null) {
      return null;
   } else
      return (
         <Modal
            title={<h2>Check Intent</h2>}
            {...modalProps}
            okButtonProps={{ disabled: !submittable }}
            width={'50%'}
            onCancel={() => {
               if (
                  edge &&
                  (form.getFieldValue('condition').length <= 0 ||
                     (edge.sourceHandle !== 'prompt-and-collect-false' &&
                        !form.getFieldValue('intent')))
               )
                  deleteEdgeById(edge.id);
               setShowModal(false);
            }}
            afterClose={() => {
               form.resetFields();
            }}
            onOk={() => {
               if (
                  edge &&
                  (form.getFieldValue('condition').length <= 0 ||
                     (edge.sourceHandle !== 'prompt-and-collect-false' &&
                        !form.getFieldValue('intent')))
               )
                  deleteEdgeById(edge.id);
               else {
                  const temp = edges.map((item) => {
                     if (item.id === edge.id) {
                        return {
                           ...item,
                           selected: false,
                           label: (
                              <span>
                                 <b>{label ?? form.getFieldValue('condition')}</b>{' '}
                                 {form.getFieldValue('intent')}
                              </span>
                           ),
                           data: {
                              condition: form.getFieldValue('condition'),
                              intent: form.getFieldValue('intent'),
                           },
                        };
                     }
                     return item;
                  });
                  setEdges(temp);
               }
               setShowModal(false);
            }}>
            <Form
               initialValues={{
                  condition: defaultValueSelect,
                  intent: edge?.data?.intent,
               }}
               form={form}
               layout="vertical"
               style={{ display: 'flex', gap: '16px' }}>
               <Form.Item name={'condition'} label="Condition" style={{ flex: 1 }}>
                  <Select
                     onSelect={(_, e1) => {
                        setLabel(e1.label);
                     }}
                     options={
                        edge.sourceHandle === 'prompt-and-collect-false'
                           ? listOptionFalse
                           : listOptionTrue
                     }
                  />
               </Form.Item>
               {edge.sourceHandle === 'prompt-and-collect-false' ? null : (
                  <Form.Item name={'intent'} label="Value" style={{ flex: 2 }}>
                     <Input />
                  </Form.Item>
               )}
            </Form>
         </Modal>
      );
};

export default ModalEditCheckIntent;
