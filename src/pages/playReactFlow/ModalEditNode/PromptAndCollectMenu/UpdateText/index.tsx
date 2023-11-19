import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { tLanguage } from '@pages/PlayReactFlow/CustomNode';
import { PromptCollectData } from '@pages/PlayReactFlow/CustomNode/PromptCollectNode';
import { Input } from 'antd';
import React, { useState } from 'react';
import { Node } from 'reactflow';

interface UpdateTextProps {
   item: { key: string | number; language: tLanguage; message: string };
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
   index: number;
}
const UpdateText: React.FC<UpdateTextProps> = (props) => {
   const { item, innerNode, setInnerNode, index } = props;

   const [curText, setCurText] = useState(item.message);

   const updateTextByIndex = (value: string, index: number) => {
      let arr = innerNode.data.text.map(function (item, i) {
         if (index === i) {
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

   const removeTextByIndex = (index: number) => {
      let arr = innerNode.data.text.filter(function (_, i) {
         return index !== i;
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
      <div className="input-container" key={item.key + '' + index}>
         <Input.TextArea
            placeholder="Enter your chatbot response"
            defaultValue={item.message}
            style={{
               padding: '10px 8px',
            }}
            onChange={(e) => {
               setCurText(e.target.value);
            }}
            autoSize={{ minRows: 1, maxRows: 6 }}
            onKeyDown={(e) => {
               console.log(e);
               if (e.key === 'Enter') {
                  console.log('enter');
                  if (curText.length <= 0) removeTextByIndex(index);
                  else updateTextByIndex(curText, index);
               }
            }}
         />
         <div className="actions">
            <i
               className={'item save' + (curText !== item.message ? ' active' : '')}
               onClick={() => {
                  //   updateTextByIndex(index);
                  if (curText.length <= 0) removeTextByIndex(index);
                  else updateTextByIndex(curText, index);
               }}>
               <CheckOutlined />
            </i>
            <i
               className="item  delete"
               onClick={() => {
                  removeTextByIndex(index);
               }}>
               <DeleteOutlined />
            </i>
         </div>
      </div>
   );
};

export default UpdateText;
