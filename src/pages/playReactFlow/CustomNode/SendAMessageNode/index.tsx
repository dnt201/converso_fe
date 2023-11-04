import { Handle, Node, NodeProps, Position } from 'reactflow';
import { tLanguage } from '..';

export interface SendAMessageData {
   // type: string;
   // name: string;
   // text: { language: tLanguage; message: string }[];
   // nextAction: string;
   number: number;
}

export type SendAMessageNode = Node<SendAMessageData>;

const SendAMessageNode: React.FC<NodeProps<SendAMessageData>> = (props) => (
   <>
      <Handle type="target" position={Position.Top} />
      <div>
         <label htmlFor="text">Send A Message</label>
      </div>
   </>
);

export default SendAMessageNode;
