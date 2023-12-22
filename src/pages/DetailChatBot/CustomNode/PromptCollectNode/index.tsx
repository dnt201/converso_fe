import React from 'react';
import { Handle, Node, NodeProps, Position } from 'reactflow';
import { TypeOfNode, ValidateType, tLanguage } from '..';
import { CheckOutlined, CloseOutlined, QuestionCircleFilled } from '@ant-design/icons';

import './style.less';

export type PROMPT_COLLECT_TYPE = 'address_template' | 'template' | 'normal';
export interface PromptCollectData {
   id: string;

   type: TypeOfNode;
   name: string;
   text: {
      // key: string | number;
      language: tLanguage;
      message: string;
   }[];
   validateType: string;
   answer: {
      label: string;
      value: string;
   };
   intent: string;
   nextAction: {
      case: string; //"label:{intent}" backend tự check
      actionId: string;
   }[];
   extend: tProduct[];
   prompt_type: PROMPT_COLLECT_TYPE;
}
export type tProduct = {
   title: string;
   subtitle: string;
   image_url: string;
   default_action: {
      url: string;
      type: string;
      webview_height_ratio: string;
   };
   buttons: Array<WEB_URL | POST_BACK | PHONE_NUMBER>;
};

export type WEB_URL = {
   type: 'web_url';
   title: string;
   url: string;
};

export type POST_BACK = {
   type: 'postback';
   title: string;
   payload: string;
};

export type PHONE_NUMBER = {
   type: 'phone_number';
   title: string;
   payload: string;
};


export type tTypeButtonInProduct = 'web_url' | 'postback' | 'phone_number';

export type tPromptCollectNodeProps = NodeProps<PromptCollectData>;
export type tPromptCollectNode = Node<PromptCollectData>;

const PromptCollectNode: React.FC<tPromptCollectNodeProps> = (props) => {
   return (
      <div className="node prompt-collect-node">
         <Handle className="handle-target" type="target" position={Position.Top} />
         <div className="content">
            <i className="icon">
               <QuestionCircleFilled />
            </i>
            <label className="label" htmlFor="text">
               {props.data.name}
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
