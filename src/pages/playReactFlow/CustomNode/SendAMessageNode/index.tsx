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

const SendAMessageNode = (props: any) => {
   return (
      <div className="node send-a-message-node">
         <Handle className="handle-target" id="target-top" type="target" position={Position.Top} />
         <Handle className="handle-target" id="source-top" type="source" position={Position.Top} />
         <Handle
            className="handle-target"
            id="target-left"
            type="target"
            position={Position.Left}
         />
         <Handle
            className="handle-target"
            id="source-left"
            type="source"
            position={Position.Left}
         />
         <Handle
            className="handle-target"
            id="target-right"
            type="target"
            position={Position.Right}
         />
         <Handle
            className="handle-target"
            id="source-right"
            type="source"
            position={Position.Right}
         />
         <Handle
            className="handle-target"
            id="target-bottom"
            type={'target'}
            position={Position.Bottom}
         />{' '}
         <Handle
            className="handle-target"
            id="source-bottom"
            type={'source'}
            position={Position.Bottom}
         />
         <div className="content">
            <i className="icon">
               <MessageFilled />
            </i>
            <label className="label">Send A Message</label>
         </div>
      </div>
   );
};

export default SendAMessageNode;
