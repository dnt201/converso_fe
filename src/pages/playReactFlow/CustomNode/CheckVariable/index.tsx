import { ApartmentOutlined, FilterFilled } from '@ant-design/icons';
import React from 'react';
import { Handle, Node, NodeProps, Position } from 'reactflow';

export interface CheckVariableData {
   type: string;
   name: string;
   attribute: string;
   nextAction: {
      case: string;
      actionId: string;
   }[];
}

export type tCheckVariableProps = NodeProps<CheckVariableData>;
export type tCheckVariableNode = Node<CheckVariableData>;

const CheckVariableNode: React.FC<tCheckVariableProps> = (props) => {
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
         />
         <Handle
            className="handle-target"
            id="source-bottom"
            type={'source'}
            position={Position.Bottom}
         />
         <div className="content">
            <i className="icon">
               <ApartmentOutlined />
            </i>
            <label className="label">{props.data.name}</label>
         </div>
      </div>
   );
};

export default CheckVariableNode;
