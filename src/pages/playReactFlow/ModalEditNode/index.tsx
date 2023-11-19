import React from 'react';
import { Node } from 'reactflow';
import './style.less';
import { tListNodeData } from '../CustomNode';
import PromptCollectMenu from './PromptAndCollectMenu';
import { PromptCollectData } from '../CustomNode/PromptCollectNode';

interface ModalEditNodeProps {
   node: Node<tListNodeData> | null;
   setNode: (curNode: Node | null) => void;
   hidden: boolean;
}
const ModalEditNode: React.FC<ModalEditNodeProps> = (props) => {
   const { node, setNode, hidden } = props;
   return (
      <div className={'modal-edit-node-response ' + (hidden || !node ? 'hidden' : '')}>
         <div
            className="overlay"
            onClick={(e) => {
               setNode(null);
            }}
         />

         {node ? (
            node.type === 'promptandcollect' ? (
               <PromptCollectMenu
                  setNode={(curNode) => setNode(curNode)}
                  closeModal={() => setNode(null)}
                  promptCollect={node as Node<PromptCollectData>}
               />
            ) : // <div>{node.data}</div>
            node.type === 'another' ? (
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
