import React from 'react';
import { Handle, Node, Position } from 'reactflow';
import { ValidateType, tLanguage } from '..';

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
      <div className="prompt-collect-node">
         <Handle type="target" position={Position.Top} />
         <div>
            <label htmlFor="text">Prompt and Collect node</label>
         </div>
      </div>
   );
};

export default PromptCollectNode;
