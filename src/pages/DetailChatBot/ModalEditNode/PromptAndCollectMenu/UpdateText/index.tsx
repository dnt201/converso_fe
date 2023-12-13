import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { tLanguage } from '@pages/DetailChatBot/CustomNode';
import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Input } from 'antd';
import React, { useState } from 'react';
import { Node } from 'reactflow';

interface UpdateTextProps {
   item: { language: tLanguage; message: string };
   innerNode: Node<PromptCollectData>;
   curIndex: number;
   setInnerNode: (node: Node<PromptCollectData>) => void;
}
const UpdateText: React.FC<UpdateTextProps> = (props) => {
   const { item, innerNode, curIndex, setInnerNode } = props;
   const [curText, setCurText] = useState(item.message);
   const updateTextByKey = (value: string) => {
      const tempDataText = innerNode.data.text.map((item, index) => {
         if (index === curIndex) return { ...item, message: value };
         else return item;
      });

      setInnerNode({
         ...innerNode,
         data: {
            ...innerNode.data,
            text: tempDataText,
         },
      });
   };

   const removeTextByKey = (key: string | number) => {
      const tempDataText = innerNode.data.text.filter((_, index) => index !== curIndex);
      // const arr = innerNode.data.text.map((o, i) => {
      //    console.log(innerNode.data.text[i]);
      //    return o;
      //    // return key !== i;
      // });
      setInnerNode({
         ...innerNode,
         data: {
            ...innerNode.data,
            text: tempDataText,
         },
      });
   };
   return (
      <div className="input-container" key={curIndex}>
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
                  if (curText.length <= 0) removeTextByKey(curIndex);
                  else {
                     updateTextByKey(curText);
                     e.currentTarget.blur();
                  }
               }
            }}
         />
         <div className="actions">
            <i
               className={'item save' + (curText !== item.message ? ' active' : '')}
               onClick={() => {
                  if (curText.length <= 0) removeTextByKey(curIndex);
                  else updateTextByKey(curText);
               }}>
               <CheckOutlined />
            </i>
            <i
               className="item  delete"
               onClick={() => {
                  removeTextByKey(curIndex);
               }}>
               <DeleteOutlined />
            </i>
         </div>
      </div>
   );
};

export default UpdateText;
