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
];

function getLabelByValue(value: string): string | undefined {
   const option = listOptionTrue.find((option) => option.value === value);
   return option ? option.label : undefined;
}

const ModalEditCheckIntent: React.FC<ModalEditCheckIntentProps> = (props) => {
   const { nodes, setNodes, edge, edges, setEdges, setShowModal, ...modalProps } = props;
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
      if (node.data.id === edge.source && node.data.type === 'promptandcollect') {
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
            title={<h2>Check Intent</h2>}
            {...modalProps}
            okButtonProps={{ disabled: !submittable }}
            width={'50%'}
            onCancel={() => {
               if (
                  edge &&
                  (form.getFieldValue('condition') === undefined ||
                     form.getFieldValue('condition').length <= 0 ||
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
                  (form.getFieldValue('condition') === undefined ||
                     form.getFieldValue('condition')?.length <= 0 ||
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
                  if (!edge.data) {
                     //add mới
                     const listTemp = nodes.map((node) => {
                        if (node.data.id === edge.source) {
                           const asNode = node as Node<PromptCollectData>;
                           return {
                              ...asNode,
                              data: {
                                 ...asNode.data,
                                 nextAction: asNode.data.nextAction.concat({
                                    case:
                                       edge.sourceHandle === 'prompt-and-collect-false'
                                          ? form.getFieldValue('condition')
                                          : `${form.getFieldValue(
                                               'condition'
                                            )}: ${form.getFieldValue('intent')}`,
                                    actionId: edge.target,
                                 }),
                              },
                           };
                        }
                        return node;
                     });
                     setNodes(listTemp);
                  } else {
                     //update
                  }
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
               <Form.Item name={'condition'} label="Condition" style={{ flex: 1, minWidth: 200 }}>
                  <Select
                     onSelect={(_, e1) => {
                        setLabel(e1.label);
                     }}
                     placeholder="Select condition."
                     options={
                        edge.sourceHandle === 'prompt-and-collect-false'
                           ? listOptionFalse.filter((item) => {
                                if (
                                   !curNodeSource.data.nextAction.findIndex((next) => {
                                      next.case.includes(item.label);
                                   })
                                )
                                   return item;
                             })
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
