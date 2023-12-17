import { ApiFilled } from '@ant-design/icons';
import './style.less';
import { Handle, Node, NodeProps, Position } from 'reactflow';
import { TypeOfNode } from '..';
export interface SubFlowData {
   id: string;
   type: TypeOfNode;
   name: string;
   flowId: string;
   nextAction: string;
}

export type tSubFlowNodeProps = NodeProps<SubFlowData>;
export type tSubFlowNode = Node<SubFlowData>;

const SubFlowNode: React.FC<tSubFlowNodeProps> = (props) => {
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
            <label className="label">{props.data.name}</label>
         </div>
      </div>
   );
};

export default SubFlowNode;
