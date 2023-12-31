import { CheckOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { tLanguage } from '@pages/DetailChatBot/CustomNode';
import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { SendAMessageData } from '@pages/DetailChatBot/CustomNode/SendAMessageNode';
import { Input, Space } from 'antd';
import React, { useState } from 'react';
import { Node } from 'reactflow';

interface UpdateTextSendAMessageProps {
   curUpdateText: { language: tLanguage; message: string };
   innerNode: Node<SendAMessageData>;
   setInnerNode: (node: Node<SendAMessageData>) => void;
}
const UpdateTextSendAMessage: React.FC<UpdateTextSendAMessageProps> = (props) => {
   const { curUpdateText, innerNode, setInnerNode } = props;
   const [curText, setCurText] = useState(curUpdateText.message);
   const updateTextByKey = (value: string) => {
      let flag = false;

      let tempDataText = innerNode.data.text.map((i) => {
         if (i.language === curUpdateText.language) {
            flag = true;
            return { language: i.language, message: value };
         } else return i;
      });

      if (flag === false) {
         tempDataText = tempDataText.concat({ language: curUpdateText.language, message: value });
      }

      setInnerNode({
         ...innerNode,
         data: {
            ...innerNode.data,
            text: tempDataText,
         },
      });
   };
   return (
      <div className="input-container">
         <Input.TextArea
            placeholder={`Enter your flow response - shift enter to next line`}
            defaultValue={curUpdateText.message}
            style={{
               padding: '10px 8px',
            }}
            value={curText}
            onChange={(e) => {
               setCurText(e.currentTarget.value);
            }}
            // autoSize={{ minRows: 2, maxRows: 4 }}
            onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                  e.currentTarget.blur();
                  updateTextByKey(curText);
               }
            }}
         />
         <Space
            size={4}
            className={'add' + (curText === curUpdateText.message ? ' saved' : '')}
            onClick={() => updateTextByKey(curText)}>
            <i className="item">
               <PlusOutlined />
            </i>
            Add
         </Space>
      </div>
   );
};

export default UpdateTextSendAMessage;
