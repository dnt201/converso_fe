import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { tLanguage } from '@pages/DetailChatBot/CustomNode';
import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Input } from 'antd';
import React, { useState } from 'react';
import { Node } from 'reactflow';

interface UpdateTextProps {
   item: { key: string | number; language: tLanguage; message: string };
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
}
const UpdateText: React.FC<UpdateTextProps> = (props) => {
   const { item, innerNode, setInnerNode } = props;
   const [curText, setCurText] = useState(item.message);

   const updateTextByKey = (value: string, key: string | number) => {
      const arr = innerNode.data.text.map(function (item) {
         if (key === item.key) {
            return { ...item, message: value };
         } else return item;
      });
      setInnerNode({
         ...innerNode,
         data: {
            ...innerNode.data,
            text: arr,
         },
      });
   };

   const removeTextByKey = (key: string | number) => {
      const arr = innerNode.data.text.filter(function (i) {
         return key !== i.key;
      });
      setInnerNode({
         ...innerNode,
         data: {
            ...innerNode.data,
            text: arr,
         },
      });
   };
   return (
      <div className="input-container" key={item.key}>
         <Input.TextArea
            placeholder="Enter your chatbot response"
            defaultValue={item.message}
            style={{
               padding: '10px 8px',
            }}
            onChange={(e) => {
               setCurText(e.target.value);
            }}
            autoSize={{ minRows: 1, maxRows: 3 }}
            onKeyDown={(e) => {
               if (e.key === 'Enter') {
                  if (curText.length <= 0) removeTextByKey(item.key);
                  else {
                     updateTextByKey(curText, item.key);
                     e.currentTarget.blur();
                  }
               }
            }}
         />
         <div className="actions">
            <i
               className={'item save' + (curText !== item.message ? ' active' : '')}
               onClick={() => {
                  if (curText.length <= 0) removeTextByKey(item.key);
                  else updateTextByKey(curText, item.key);
               }}>
               <CheckOutlined />
            </i>
            <i
               className="item  delete"
               onClick={() => {
                  removeTextByKey(item.key);
               }}>
               <DeleteOutlined />
            </i>
         </div>
      </div>
   );
};

export default UpdateText;
