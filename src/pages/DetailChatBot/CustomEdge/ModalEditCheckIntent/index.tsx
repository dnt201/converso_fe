import { iOption } from '@interfaces/index';
import { Form, Input, Modal, ModalProps, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';
import { ListEdgeType } from '../indext';
import { findOptionByValue } from '@utils/index';
import { tListNodeData } from '@pages/DetailChatBot/CustomNode';
import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';

interface ModalEditCheckIntentProps extends ModalProps {
   edge: Edge<ListEdgeType> | null;
   edges: Edge[];
   setEdges: (edges: any) => void;
   setShowModal: (b: boolean) => void;
   nodes: Node<tListNodeData>[];

   setNodes: (curNodes: Node[]) => void;
}
export interface iValueEdgePromptCollect {
   condition: string;
   intent: string;
}

const listOptionTrue: iOption[] = [
   {
      value: 'Equal',
      label: 'Equal',
   },
   {
      value: 'Not equal',
      label: 'Not equal',
   },
   {
      value: 'Is less than',
      label: 'Is less than',
   },
   {
      value: 'Is less than or equal',
      label: 'Is less than or equal',
   },
   {
      value: 'Is greater than or equal',
      label: 'Is greater than or equal',
   },
   {
      value: 'Start with',
      label: 'Start with',
   },
   {
      value: 'Ends with',
      label: 'Ends with',
   },
   {
      value: 'Contains',
      label: 'Contains',
   },
   {
      value: 'Exist',
      label: 'Exist',
   },
];

const listOptionFalse: iOption[] = [
   {
      value: 'other',
      label: 'Else',
   },
   {
      value: 'Not match',
      label: 'Not match',
   },
];

function getLabelByValue(value: string): string | undefined {
   const option = listOptionFalse.find((option) => option.value === value);
   return option ? option.label : 'undefined';
}

const ModalEditCheckIntent: React.FC<ModalEditCheckIntentProps> = (props) => {
   const { nodes, setNodes, edge, edges, setEdges, setShowModal, ...modalProps } = props;
   const [form] = useForm();
   const [submittable, setSubmittable] = useState(false);
   const formData = Form.useWatch([], form);
   // const [label, setLabel] = useState(
   //    edge
   //       ? edge.sourceHandle === 'prompt-and-collect-false'
   //          ? listOptionFalse[0].label
   //          : listOptionTrue[0].label
   //       : listOptionTrue[0].label
   // );
   const deleteEdgeById = (id: string) => {
      setEdges(edges.filter((edge) => edge.id !== id));
   };
   let defaultValueSelect: string = '';
   if (edge)
      if (
         edge.sourceHandle === 'prompt-and-collect-false' ||
         edge.sourceHandle === 'check-variable-false'
      ) {
         defaultValueSelect =
            edge.data?.condition && edge.data?.condition !== ''
               ? findOptionByValue(edge.data.condition, listOptionFalse)?.value ?? ''
               : undefined;
      } else {
         defaultValueSelect =
            edge.data?.condition && edge.data?.condition !== ''
               ? findOptionByValue(edge.data.condition, listOptionTrue)?.value ?? ''
               : undefined;
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

   const curNodeSource = nodes.find((node) => {
      if (
         node.data.id === edge.source
         // && node.data.type === 'promptandcollect'
      ) {
         const temp = node;
         return temp;
      }
      return undefined;
   }) as Node<PromptCollectData>;
   if (edge === null) {
      return null;
   } else
      return (
         <Modal
            maskClosable={false}
            title={<h2>Check Intent</h2>}
            {...modalProps}
            okButtonProps={{ disabled: !submittable }}
            width={'50%'}
            onCancel={() => {
               setShowModal(false);
               let condition = form.getFieldValue('condition');
               let intent = form.getFieldValue('intent');
               if (
                  condition === undefined ||
                  condition.length <= 0 ||
                  (!edge.sourceHandle.includes('false') &&
                     (intent === undefined || intent.length <= 0))
               ) {
                  deleteEdgeById(edge.id);
               }
               form.resetFields();
            }}
            afterClose={() => {
               let condition = form.getFieldValue('condition');
               let intent = form.getFieldValue('intent');
               if (
                  condition === undefined ||
                  condition.length <= 0 ||
                  (!edge.sourceHandle.includes('false') &&
                     (intent === undefined || intent.length <= 0))
               ) {
                  deleteEdgeById(edge.id);
               }
               form.resetFields();
            }}
            onOk={() => {
               form.submit();
            }}>
            <Form
               initialValues={{
                  condition: defaultValueSelect,
                  intent: edge?.data?.intent,
               }}
               form={form}
               layout="vertical"
               onFinish={(formV) => {
                  let condition = formV.condition;
                  let intent = formV.intent;
                  if (
                     condition === undefined ||
                     condition.length <= 0 ||
                     (!edge.sourceHandle.includes('false') &&
                        (intent === undefined || intent.length <= 0))
                  ) {
                     deleteEdgeById(edge.id);
                  } else {
                     const temp = edges.map((item) => {
                        if (item.id === edge.id) {
                           return {
                              ...item,
                              selected: false,
                              label:
                                 edge.sourceHandle !== 'prompt-and-collect-false' &&
                                 edge.sourceHandle !== 'check-variable-false'
                                    ? `${condition}: ${intent}`
                                    : getLabelByValue(condition),
                              data: {
                                 condition: condition,
                                 intent: intent,
                              },
                           };
                        }
                        return item;
                     });

                     setEdges(temp);
                  }
                  setShowModal(false);
               }}
               style={{ display: 'flex', gap: '16px' }}>
               <Form.Item name={'condition'} label="Condition" style={{ flex: 1, minWidth: 200 }}>
                  <Select
                     placeholder="Select condition."
                     options={
                        edge.sourceHandle === 'prompt-and-collect-false' ||
                        edge.sourceHandle === 'check-variable-false'
                           ? listOptionFalse.filter((item) => {
                                if (
                                   curNodeSource.data.nextAction.findIndex((next) => {
                                      next.case
                                         .toLocaleLowerCase()
                                         .includes(item.label.toLocaleLowerCase());
                                   }) <= 0
                                )
                                   return item;
                             })
                           : listOptionTrue
                     }
                  />
               </Form.Item>
               {edge.sourceHandle === 'prompt-and-collect-false' ||
               edge.sourceHandle === 'check-variable-false' ? null : (
                  <Form.Item name={'intent'} label="Value" style={{ flex: 2 }}>
                     <Input />
                  </Form.Item>
               )}
            </Form>
         </Modal>
      );
};

export default ModalEditCheckIntent;
