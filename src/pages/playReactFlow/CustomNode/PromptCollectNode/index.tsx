import React from 'react';
import { Handle, Node, Position } from 'reactflow';
import { ValidateType, tLanguage } from '..';
import { CheckOutlined, CloseOutlined, PhoneFilled, PhoneOutlined } from '@ant-design/icons';

import './style.less';
export interface PromptCollectData {
   type: string;
   name: string;
   text: {
      language: tLanguage;
      message: string;
   }[];
   validateType: ValidateType;
   answer: string;
   intent: string;
}

export type SendAMessageNode = Node<PromptCollectData>;

const PromptCollectNode = () => {
   return (
      <div className="node prompt-collect-node">
         <Handle className="handle-target" type="target" position={Position.Top} />
         <div className="content">
            <i className="icon">
               <PhoneFilled />
            </i>
            <label className="label" htmlFor="text">
               Prompt and Collect
            </label>
         </div>
         <Handle
            className="handle-target-false"
            id="prompt-and-collect-false"
            style={{
               left: '25%',
            }}
            type="source"
            position={Position.Bottom}>
            <i className="icon">
               <CloseOutlined />
            </i>
         </Handle>
         <Handle
            className="handle-target-true"
            id="prompt-and-collect-true"
            style={{
               left: '75%',
            }}
            type="source"
            position={Position.Bottom}>
            <i className="icon">
               <CheckOutlined />
            </i>
         </Handle>
      </div>
   );
};

export default PromptCollectNode;
