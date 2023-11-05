import {
   CarOutlined,
   MessageOutlined,
   NotificationOutlined,
   SendOutlined,
} from '@ant-design/icons';
import ResponseNode from './ResponseNode';
import FlowNode from '@pages/PlayReactFlow/CustomNode/Flow';
import { ReactNode } from 'react';
import SendAMessageNode from './SendAMessageNode';
import PromptCollectNode from './PromptCollectNode';

export const nodeTypes = {
   response: ResponseNode,
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
   { icon: <MessageOutlined />, label: 'Response', value: 'response' },
   { icon: <SendOutlined />, label: 'SendAMessage', value: 'sendAMessage' },
   { icon: <CarOutlined />, label: 'PromptCollect', value: 'promptCollect' },
];

export type ValidateType = 'yes-no' | 'number' | 'email' | 'phonenumber' | 'intent';
