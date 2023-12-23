import { CheckOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { tLanguage } from '@pages/DetailChatBot/CustomNode';
import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Input, Space } from 'antd';
import React, { useState } from 'react';
import { Node } from 'reactflow';

interface UpdateTextProps {
   curUpdateText: { language: tLanguage; message: string };
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
}
const UpdateText: React.FC<UpdateTextProps> = (props) => {
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
            placeholder="Enter your chatbot response - shift enter to next line"
            defaultValue={curUpdateText.message}
            style={{
               padding: '10px 8px',
            }}
            value={curText}
            onChange={(e) => {
               setCurText(e.currentTarget.value);
            }}
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

export default UpdateText;
