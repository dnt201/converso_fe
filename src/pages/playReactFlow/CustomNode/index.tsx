import {
   CreditCardOutlined,
   HomeOutlined,
   MessageOutlined,
   PhoneOutlined,
   SendOutlined,
} from '@ant-design/icons';
import FlowNode from '@pages/PlayReactFlow/CustomNode/Flow';
import { ReactNode } from 'react';
import SendAMessageNode from './SendAMessageNode';
import PromptCollectNode from './PromptCollectNode';
import StartNode from './StartNode';

export const nodeTypes = {
   start: StartNode,
   flow: FlowNode,
   sendAMessage: SendAMessageNode,
   promptCollect: PromptCollectNode,
};

export type tLanguage = 'vn' | 'en';

interface NodeType {
   icon: ReactNode; // Assuming icon is a ReactNode
   label: string;
   value: string;
}

export const listNodes: NodeType[] = [
   // { icon: <HomeOutlined />, label: 'Start point', value: 'start' },
   // { icon: <MessageOutlined />, label: 'Response', value: 'response' },
   { icon: <MessageOutlined />, label: 'SendAMessage', value: 'sendAMessage' },
   { icon: <PhoneOutlined />, label: 'PromptCollect', value: 'promptCollect' },
];

export type ValidateType = 'yes-no' | 'number' | 'email' | 'phonenumber' | 'intent';
