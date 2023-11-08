import { Handle, Node, NodeProps, Position } from 'reactflow';
import { tLanguage } from '..';
import './style.less';
import { MessageFilled, MessageOutlined } from '@ant-design/icons';
import { Space } from 'antd';

//User Input

export interface SendAMessageData {
   type: string;
   name: string;
   text: { language: tLanguage; message: string }[];
   nextAction: string;
   // number: number;
}

export type SendAMessageNode = Node<SendAMessageData>;

const SendAMessageNode: React.FC<NodeProps<SendAMessageData>> = (props) => (
   <div className="node send-a-message-node">
      <Handle className="handle-target" type="source" position={Position.Top} />
      <div className="content">
         <i className="icon">
            <MessageFilled />
         </i>
         <label className="label">Send A Message</label>
      </div>
   </div>
);

export default SendAMessageNode;
