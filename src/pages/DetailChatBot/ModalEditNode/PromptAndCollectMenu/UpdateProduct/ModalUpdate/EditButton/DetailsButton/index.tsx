import {
   PHONE_NUMBER,
   POST_BACK,
   PromptCollectData,
   WEB_URL,
} from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Select } from 'antd';
import React from 'react';
import { Node } from 'reactflow';

interface DetailButtonProps {
   button: WEB_URL | POST_BACK | PHONE_NUMBER;
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
   indexProduct: number;
   indexButton: number;
}

const options = [
   { value: 'web_url', label: 'Web Url' },
   { value: 'postback', label: 'Post back' },
   { value: 'phone_number', label: 'Phone Number' },
];

const DetailButton: React.FC<DetailButtonProps> = (props) => {
   const { button } = props;
   return (
      <div>
         <Select
            placeholder="Add new button actions"
            defaultValue={button.type}
            options={options}
         />
         {button.type === 'web_url' ? (
            <div>web_url</div>
         ) : button.type === 'phone_number' ? (
            <div>phone_number</div>
         ) : button.type === 'postback' ? (
            <div>postback</div>
         ) : null}
      </div>
   );
};

export default DetailButton;
