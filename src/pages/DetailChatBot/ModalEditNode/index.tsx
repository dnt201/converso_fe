import React from 'react';
import { Node } from 'reactflow';
import { tListNodeData } from '../CustomNode';
import PromptCollectMenu from './PromptAndCollectMenu';
import { PromptCollectData } from '../CustomNode/PromptCollectNode';
import SubflowMenu from './SubflowMenu';
import { SubFlowData } from '../CustomNode/SubFlowNode/indext';
import SendAMessageMenu from './SendAMessageMenu';
import { SendAMessageData } from '../CustomNode/SendAMessageNode';
import './style.less';
import HttpRequestMenu from './HttpRequestMenu';
import { HttpRequestData } from '../CustomNode/HttpRequestNode';
import { useNavigate } from 'react-router-dom';
import { useMyListFlow } from '@hooks/flow/myListFlow';
import CheckVariableMenu from './CheckVariableMenu';
import { CheckVariableData } from '../CustomNode/CheckVariable';

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
            node.type === 'subflow' ? (
               <SubflowMenu
                  setNode={(curNode) => setNode(curNode)}
                  closeModal={() => setNode(null)}
                  node={node as Node<SubFlowData>}
               />
            ) : node.type === 'message' ? (
               <SendAMessageMenu
                  setNode={(curNode) => setNode(curNode)}
                  closeModal={() => setNode(null)}
                  node={node as Node<SendAMessageData>}
               />
            ) : node.type === 'checkattribute' ? (
               <CheckVariableMenu
                  setNode={(curNode) => setNode(curNode)}
                  closeModal={() => setNode(null)}
                  node={node as Node<CheckVariableData>}
               />
            ) : node.type === 'http' ? (
               <HttpRequestMenu
                  setNode={(curNode) => setNode(curNode)}
                  closeModal={() => setNode(null)}
                  node={node as Node<HttpRequestData>}
               />
            ) : null
         ) : null}
      </div>
   );
};

export default ModalEditNode;
