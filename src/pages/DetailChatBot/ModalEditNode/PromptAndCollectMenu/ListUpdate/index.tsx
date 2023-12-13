import { CaretDownFilled, PlusOutlined } from '@ant-design/icons';
import { languagesAtom } from '@pages/DetailChatBot';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import UpdateText from '../UpdateText';
import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Node } from 'reactflow';
import { useForm } from 'antd/es/form/Form';
import { tLanguage } from '@pages/DetailChatBot/CustomNode';
import FormItem from 'antd/es/form/FormItem';
import { Form, Input, Space } from 'antd';

type ListUpdateProps = {
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
   value: tLanguage;
   label: string;
   default: boolean;
};

type FormChatbotResponse = {
   chatbotResponse: string;
   language: tLanguage;
};
const ListUpdate: React.FC<ListUpdateProps> = (props) => {
   const { innerNode, setInnerNode, ...item } = props;
   const [isExpand, setIsExpand] = useState(false);
   const [languages, setLanguages] = useAtom(languagesAtom);
   const [formChatbotResponse] = useForm();
   const formChatbotResponseFinish = (formChatbotResponseValue: FormChatbotResponse) => {
      const newListText = innerNode.data.text.concat({
         message: formChatbotResponseValue.chatbotResponse,
         language: formChatbotResponseValue.language,
      });

      setInnerNode({
         ...innerNode,
         data: {
            ...innerNode.data,
            text: newListText,
         },
      });
      formChatbotResponse.resetFields();
   };

   return (
      <div className="language-container" key={item.value}>
         <div
            className={'header' + (isExpand ? ' expand' : '')}
            onClick={() => setIsExpand((pre) => !pre)}>
            <span className="label">
               {item.label} - {item.value}
            </span>
            <i className={isExpand ? 'expand' : ''}>
               <CaretDownFilled />
            </i>
         </div>
         <div className={'list-input ' + (isExpand ? ' expand' : '')}>
            {innerNode.data.text.map((text, index) => {
               if (text.language === item.value)
                  return (
                     <UpdateText
                        innerNode={innerNode}
                        item={text}
                        curIndex={index}
                        setInnerNode={(n) => setInnerNode(n)}
                        key={crypto.randomUUID() + index + item}
                     />
                  );
            })}
            <Form<FormChatbotResponse>
               form={formChatbotResponse}
               onFinish={(form) => {
                  formChatbotResponseFinish(form);
               }}>
               <Form.Item
                  name="language"
                  style={{ visibility: 'hidden', display: 'none' }}
                  initialValue={item.value}
               />
               <Form.Item
                  name="chatbotResponse"
                  rules={[
                     {
                        required: true,
                        message: 'Chatbot response is null',
                     },
                  ]}>
                  <div className="input-container add">
                     <Input.TextArea
                        onKeyDown={(e) => {
                           if (e.code === 'Enter') {
                              formChatbotResponse.submit();
                              e.currentTarget.blur();
                           }
                        }}
                        placeholder={`Enter response with ${item.label.toLowerCase()} language`}
                        style={{
                           padding: '10px 8px',
                        }}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                     />
                     <div className="actions">
                        <Space size={4} className="add">
                           <i className="item" onClick={() => formChatbotResponse.submit()}>
                              <PlusOutlined />
                           </i>
                           Add
                        </Space>
                     </div>
                  </div>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};

export default ListUpdate;
