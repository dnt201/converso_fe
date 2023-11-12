import { ApiFilled } from '@ant-design/icons';
import './style.less';
import { Handle, Node, Position } from 'reactflow';
export interface SubFlowData {
   type: string;
   name: string;
   flowId: string;
   nextAction: string;
}

export type tSubFlowNode = Node<SubFlowData>;

const SubFLowNode = () => {
   return (
      <div className="node sub-flow-node">
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
               <ApiFilled />
            </i>
            <label className="label">Send A Message</label>
         </div>
      </div>
   );
};

export default SubFLowNode;
