import { ApartmentOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { Handle, Node, NodeProps, Position } from 'reactflow';
import { TypeOfNode } from '..';

import './style.less';
export interface CheckVariableData {
   id: string;
   type: TypeOfNode;
   name: string;
   attribute?: string;
   nextAction: {
      case: string;
      actionId: string;
   }[];
}

export type tCheckVariableProps = NodeProps<CheckVariableData>;
export type tCheckVariableNode = Node<CheckVariableData>;

const CheckVariableNode: React.FC<tCheckVariableProps> = (props) => {
   return (
      <div className="node check-variable-node">
         <Handle className="handle-target" id="source-top" type="target" position={Position.Top} />

         <Handle
            className="handle-target-false"
            id="check-variable-false"
            style={{
               left: '25%',
            }}
            type="source"
            position={Position.Bottom}>
            <i className="icon">
               <CloseOutlined />
            </i>
         </Handle>
         <Handle
            className="handle-target-true"
            id="check-variable-true"
            style={{
               left: '75%',
            }}
            type="source"
            position={Position.Bottom}>
            <i className="icon">
               <CheckOutlined />
            </i>
         </Handle>
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
