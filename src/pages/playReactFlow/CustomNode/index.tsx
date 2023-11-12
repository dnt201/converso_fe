import {
   ApartmentOutlined,
   ApiOutlined,
   BuildFilled,
   CustomerServiceOutlined,
   FilterOutlined,
   MessageOutlined,
   PhoneOutlined,
   WechatFilled,
   WechatOutlined,
} from '@ant-design/icons';
import FlowNode from '@pages/PlayReactFlow/CustomNode/Flow';
import { ReactNode } from 'react';
import SendAMessageNode, { SendAMessageData } from './SendAMessageNode';
import PromptCollectNode, { PromptCollectData } from './PromptCollectNode';
import StartNode from './StartNode';
import SubFLowNode, { SubFlowData } from './SubFlowNode/indext';
import CheckVariableNode, { CheckVariableData } from './CheckVariable';
import HttpRequestNode, { HttpRequestData } from './HttpRequestNode/indext';

export const nodeTypes = {
   start: StartNode,
   flow: FlowNode,
   sendAMessage: SendAMessageNode,
   promptCollect: PromptCollectNode,
   subFlow: SubFLowNode,
   checkVariable: CheckVariableNode,
   httpRequest: HttpRequestNode,
};

export type tLanguage = 'vn' | 'en';

interface NodeType {
   icon: ReactNode; // Assuming icon is a ReactNode
   label: string;
   value: string;
}

export const listNodes: NodeType[] = [
   { icon: <MessageOutlined />, label: 'Send a message', value: 'sendAMessage' },
   { icon: <CustomerServiceOutlined />, label: 'Prompt collect', value: 'promptCollect' },
   { icon: <ApiOutlined />, label: 'Subflow', value: 'subFlow' },
   { icon: <ApartmentOutlined />, label: 'Check variable', value: 'checkVariable' },
   { icon: <BuildFilled />, label: 'Http request', value: 'httpRequest' },
];

export type tListNodeData =
   | SendAMessageData
   | PromptCollectData
   | SubFlowData
   | CheckVariableData
   | HttpRequestData;

export type ValidateType = 'yes-no' | 'number' | 'email' | 'phonenumber' | 'intent';
