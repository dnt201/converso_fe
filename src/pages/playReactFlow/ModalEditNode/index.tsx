import React from 'react';
import { Node } from 'reactflow';
import './style.less';
import { Button, Input } from 'antd';
import { tListNodeData } from '../CustomNode';
import { CloseOutlined } from '@ant-design/icons';

interface ModalEditNodeProps {
   node: Node<tListNodeData> | null;
   setNode: (curNode: Node | null) => void;
   hidden: boolean;
}
const ModalEditNode: React.FC<ModalEditNodeProps> = (props) => {
   const { node, setNode, hidden } = props;
   return (
      <div className={'modalEditNode ' + (hidden ? 'hidden' : '')}>
         <Button className="close-btn" onClick={() => setNode(null)}>
            <CloseOutlined />
         </Button>
         {node ? (
            node.type === 'promptCollect' ? (
               <div>{node.data.name}</div>
            ) : node.type === 'another' ? (
               <></>
            ) : null
         ) : null}
         {/* <h6>
            <Input
               defaultValue={props.node.data.label}
               onChange={(d) => {
                  setNode({ ...props.node, data: { label: d.target.value } });
               }}
            />
            Current node Id:
            {props.node.id}
         </h6> */}
      </div>
   );
};

export default ModalEditNode;
