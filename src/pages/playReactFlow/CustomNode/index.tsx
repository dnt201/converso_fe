import { MessageOutlined, NotificationOutlined, SendOutlined } from '@ant-design/icons';
import ResponseNode from './ResponseNode';
import FlowNode from '@pages/PlayReactFlow/CustomNode/Flow';
import { ReactNode } from 'react';
import SendAMessageNode from './SendAMessageNode';

export const nodeTypes = {
   response: ResponseNode,
   flow: FlowNode,
   sendAMessage: SendAMessageNode,
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
];
