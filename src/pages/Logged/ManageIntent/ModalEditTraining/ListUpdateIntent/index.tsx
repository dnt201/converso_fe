import { iIntentDetail } from '@hooks/intent';
import { Button, Col, Divider, Empty, Form, Input, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react';
import './style.less';
import {
   CaretDownFilled,
   CaretUpFilled,
   DeleteOutlined,
   EditOutlined,
   PlusOutlined,
   SaveOutlined,
} from '@ant-design/icons';
import CustomInput from './CustomInput';
type ListIntentProps = {
   listIntent: iIntentDetail[];
   curIndex: number;
   setListIntent: (listIntent: iIntentDetail[]) => void;
};
const ListIntent: React.FC<ListIntentProps> = (props) => {
   const { listIntent, curIndex, setListIntent } = props;
   const [curIntent, setCurIntent] = useState<iIntentDetail>(listIntent[curIndex]);
   const [isExpand, setExpand] = useState(false);
   const [curIntentName, setCurIntentName] = useState(listIntent[curIndex].intent);

   return (
      <div className="update-intent-container-lazy">
         <div className={'list-input' + (isExpand ? ' expand' : '')}>
            <Form initialValues={{ intent: curIntent.intent }}>
               <Row gutter={[8, 8]}>
                  <Col span={14}>
                     <FormItem
                        name={'intent'}
                        rules={[{ required: true, message: 'This field is required!' }]}>
                        <Input
                           placeholder="Intent"
                           defaultValue={curIntentName}
                           onChange={(e) => {
                              // listIntent.map((item, i) => {
                              //    if (i === curIndex)
                              //       return {
                              //          intent: e.target.value,
                              //          prompts: curIntent.prompts,
                              //       };
                              //    return item;
                              // });
                              setCurIntentName(e.target.value);
                              // setCurIntent(pre=> {return {...pre,intent:cu}})
                           }}
                        />
                     </FormItem>
                  </Col>
                  <Col span={4}>
                     <Button
                        danger
                        style={{ width: '100%' }}
                        onClick={() => {
                           setListIntent(
                              listIntent.filter((item, i) => {
                                 if (i !== curIndex) return item;
                              })
                           );
                        }}>
                        <DeleteOutlined /> Delete
                     </Button>
                  </Col>
                  <Col span={4}>
                     <Button
                        ghost
                        type="primary"
                        style={{ width: '100%' }}
                        onClick={() =>
                           setListIntent(
                              listIntent.map((item, i) => {
                                 if (i === curIndex)
                                    return {
                                       intent: curIntentName,
                                       prompts: curIntent.prompts.filter((e) => e.length > 0),
                                    };
                                 return item;
                              })
                           )
                        }>
                        <SaveOutlined /> Save
                     </Button>
                  </Col>
                  <Col span={2}>
                     <i
                        className={'icon-expand' + (isExpand ? ' expand' : '')}
                        onClick={() => {
                           setExpand(!isExpand);
                        }}>
                        <CaretUpFilled />
                     </i>
                  </Col>
               </Row>
            </Form>
            <Divider style={{ marginTop: 4, marginBottom: 0 }} orientation="left">
               <h5>Items</h5>
            </Divider>
            {curIntent.prompts.length <= 0 ? (
               <Empty />
            ) : (
               curIntent.prompts.map((item, index) => {
                  return (
                     <CustomInput
                        key={crypto.randomUUID()}
                        defaultValue={item}
                        onDelete={() =>
                           setCurIntent({
                              intent: curIntent.intent,
                              prompts: curIntent.prompts.filter((cur, curI) => {
                                 if (curI !== index) return cur || 'null';
                              }),
                           })
                        }
                        onSave={(e) => {
                           setCurIntent({
                              intent: curIntent.intent,
                              prompts: curIntent.prompts.map((cur, curI) => {
                                 if (curI === index) return e;
                                 return cur;
                              }),
                           });
                        }}
                     />
                     // <div style={{ display: 'flex', gap: 4 }} key={crypto.randomUUID()}>
                     //    <Input
                     //       placeholder="User Expression"
                     //       value={item}
                     //       onChange={(e) => {
                     //          setCurIntent({
                     //             curId: curIntent.curId,
                     //             intent: curIntent.intent,
                     //             prompts: curIntent.prompts.map((cur, curI) => {
                     //                if (curI === index) return e.target.value;
                     //                return cur;
                     //             }),
                     //          });
                     //       }}
                     //    />

                     //    <Button
                     //       danger
                     //       onClick={() => {
                     //          setCurIntent({
                     //             curId: curIntent.curId,
                     //             intent: curIntent.intent,
                     //             prompts: curIntent.prompts.filter((cur, curI) => {
                     //                if (curI !== index) return cur;
                     //             }),
                     //          });
                     //       }}>
                     //       <DeleteOutlined />
                     //       Delete
                     //    </Button>
                     // </div>
                  );
               })
            )}

            <Button
               ghost
               type="primary"
               style={{ width: '100%' }}
               onClick={() =>
                  setCurIntent({
                     intent: curIntent.intent,
                     prompts: curIntent.prompts.concat(''),
                  })
               }>
               <PlusOutlined /> Add Item
            </Button>
         </div>
      </div>
   );
};

export default ListIntent;
