import {
   ApartmentOutlined,
   ApiOutlined,
   BuildFilled,
   CustomerServiceOutlined,
   MessageOutlined,
   QuestionCircleOutlined,
} from '@ant-design/icons';
import { ReactNode } from 'react';
import SendAMessageNode, { SendAMessageData } from './SendAMessageNode';
import PromptCollectNode, { PromptCollectData } from './PromptCollectNode';
import SubFLowNode, { SubFlowData } from './SubFlowNode/indext';
import CheckVariableNode, { CheckVariableData } from './CheckVariable';
import HttpRequestNode, { HttpRequestData } from './HttpRequestNode';
import StartNode, { StartNodeData } from './StartNode';

export const nodeTypes = {
   start: StartNode,
   message: SendAMessageNode,
   promptandcollect: PromptCollectNode,
   subflow: SubFLowNode,
   checkattribute: CheckVariableNode,
   http: HttpRequestNode,
};

export type tLanguage =
   | 'vn'
   | 'en'
   | 'es'
   | 'fr'
   | 'de'
   | 'zh'
   | 'ar'
   | 'ru'
   | 'ja'
   | 'pt'
   | 'hi'
   | 'bn'
   | 'ur'
   | 'id'
   | 'tr'
   | 'it'
   | 'nl'
   | 'pl'
   | 'sv'
   | 'vi'
   | 'ko';

interface NodeType {
   icon: ReactNode; // Assuming icon is a ReactNode
   label: string;
   value: string;
}

export const listNodes: NodeType[] = [
   { icon: <MessageOutlined />, label: 'Send a message', value: 'message' },
   { icon: <QuestionCircleOutlined />, label: 'Prompt collect', value: 'promptandcollect' },
   { icon: <ApiOutlined />, label: 'Subflow', value: 'subflow' },
   { icon: <ApartmentOutlined />, label: 'Check variable', value: 'checkattribute' },
   { icon: <BuildFilled />, label: 'Http request', value: 'http' },
];

export type tListNodeData =
   | StartNodeData
   | SendAMessageData
   | PromptCollectData
   | SubFlowData
   | CheckVariableData
   | HttpRequestData;

export type ValidateType = 'yes-no' | 'number' | 'email' | 'phonenumber' | 'intent';
