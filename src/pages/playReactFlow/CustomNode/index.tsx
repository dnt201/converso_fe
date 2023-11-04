import { ExperimentOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons';
import ReceiveNode from './ReceiveNode';
import ResponseNode from './ResponseNode';
import FlowNode from '@pages/PlayReactFlow/CustomNode/Flow';
import { ReactNode } from 'react';

export const nodeTypes = {
   receiveNode: ReceiveNode,
   //   SentimentAnalysis: SentimentAnalysis,
   responseNode: ResponseNode,
   flowNode: FlowNode,
   //   NotifyAgent: NotifyAgent,
};

interface NodeType {
   icon: ReactNode; // Assuming icon is a ReactNode
   label: string;
   value: string;
}
export const listNodes: NodeType[] = [
   {
      icon: <ExperimentOutlined />,
      label: 'Sentiment Analysis',
      value: 'SentimentAnalysis',
   },
   {
      icon: <NotificationOutlined />,
      label: 'Notify Agent',
      value: 'NotifyAgent',
   },
   { icon: <MessageOutlined />, label: 'Respond', value: 'Respond' },
];
