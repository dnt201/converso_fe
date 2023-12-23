import { Handle, Node, NodeProps, Position } from 'reactflow';
import { TypeOfNode, tLanguage } from '..';
import './style.less';
import { MessageFilled } from '@ant-design/icons';
import { PHONE_NUMBER, POST_BACK, WEB_URL } from '../PromptCollectNode';

//User Input

export interface SendAMessageData {
   id: string;

   type: TypeOfNode;
   name: string;
   text: { language: tLanguage; message: string }[];
   nextAction: string;
   buttons: Array<WEB_URL | POST_BACK | PHONE_NUMBER>;

   // number: number;
}

export type tSendAMessageNodeProps = NodeProps<SendAMessageData>;
export type tSendAMessageNode = Node<SendAMessageData>;

const SendAMessageNode: React.FC<tSendAMessageNodeProps> = (props) => {
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
            <label className="label">{props.data.name}</label>
         </div>
      </div>
   );
};

export default SendAMessageNode;
