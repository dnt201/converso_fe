import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
   Node,
   ReactFlowProvider,
   useNodesState,
   useEdgesState,
   Controls,
   Connection,
   Edge,
   ReactFlowInstance,
   MarkerType,
} from 'reactflow';
import './style.less';
import SideBar from '@pages/PlayReactFlow/SideBar';
import 'reactflow/dist/style.css';
import { nodeTypes, tLanguage, tListNodeData } from '@pages/PlayReactFlow/CustomNode';

import ModalEditCheckIntent from './CustomEdge/ModalEditCheckIntent';
import { ListEdgeType, edgeTypes } from './CustomEdge/indext';

import ModalEditNode from './ModalEditNode';
import { tPromptCollectNode } from './CustomNode/PromptCollectNode';
import { tSubFlowNode } from './CustomNode/SubFlowNode/indext';
import NavTopChatbot from './NavTop';
import { tCheckVariableNode } from './CustomNode/CheckVariable';
import { tHttpRequestNode } from './CustomNode/HttpRequestNode';
import { tSendAMessageNode } from './CustomNode/SendAMessageNode';
import { tStartNode } from './CustomNode/StartNode';
import { Modal } from 'antd';
import { atom, useAtom } from 'jotai';
import SettingsModal from './SettingsModal';

const initialNodes = [
   {
      id: 'start-node',
      type: 'start',
      data: { label: 'Start point', name: 'Start point', type: 'start' },
      position: { x: 250, y: 70 },
      deletable: false,
   } as tStartNode,
   // {
   //    id: 'prompt',
   //    type: 'promptCollect',
   //    data: { label: 'promptCollect' },
   //    position: { x: 250, y: 150 },
   //    deletable: false,
   // },
   // {
   //    id: 'message',
   //    type: 'sendAMessage',
   //    data: { label: 'sendAMessage' },
   //    position: { x: 250, y: 250 },
   //    deletable: false,
   // },
   // ];
   // const initialEdges = [
   //    {
   //       data: { intent: '1', condition: 'equal' },
   //       id: 'e1-2',
   //       source: 'prompt',
   //       sourceHandle: 'prompt-and-collect-true',
   //       target: 'message',
   //       targetHandle: 'target-top',
   //       type: 'promptCollectEdge',
   //    },
   //    {
   //       data: { intent: '51', condition: 'equal' },
   //       id: 'e22',
   //       source: 'prompt',
   //       sourceHandle: 'prompt-and-collect-true',
   //       target: 'message',
   //       targetHandle: 'target-top',
   //       type: 'promptCollectEdge',
   //    },
];
export interface iLanguageOption {
   value: tLanguage;
   label: string;
}

export const listLanguageSystem: iLanguageOption[] = [
   { value: 'en', label: 'English' },
   { value: 'es', label: 'Spanish' },
   { value: 'fr', label: 'French' },
   { value: 'de', label: 'German' },
   { value: 'zh', label: 'Mandarin Chinese' },
   { value: 'ar', label: 'Arabic' },
   { value: 'ru', label: 'Russian' },
   { value: 'ja', label: 'Japanese' },
   { value: 'pt', label: 'Portuguese' },
   { value: 'hi', label: 'Hindi' },
   { value: 'bn', label: 'Bengali' },
   { value: 'ur', label: 'Urdu' },
   { value: 'id', label: 'Indonesian' },
   { value: 'tr', label: 'Turkish' },
   { value: 'it', label: 'Italian' },
   { value: 'nl', label: 'Dutch' },
   { value: 'pl', label: 'Polish' },
   { value: 'sv', label: 'Swedish' },
   { value: 'vi', label: 'Vietnamese' },
   { value: 'ko', label: 'Korean' },
];

export const languagesAtom = atom<{ value: tLanguage; label: string; default: boolean }[]>([
   { value: 'en', label: 'English', default: true },
]);

const DnDFlow: React.FC = () => {
   //Todo: State - ReactFlow
   const [nodes, setNodes, onNodesChange] = useNodesState<tListNodeData | { label: string }>(
      initialNodes
   );
   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
   const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
   const [selectedNode, setSelectedNode] = useState<Node<tListNodeData> | null>(null);
   const [selectedEdge, setSelectedEdge] = useState<Edge<ListEdgeType> | null>(null);
   const selectedEdgeId = useRef<string | null>(null);

   const [languages, setLanguages] = useAtom(languagesAtom);

   //Todo: State - Another: modal,...
   const [openModalEditCheckIntent, setOpenModalEditCheckIntent] = useState<boolean>(false);
   const [openModalSettings, setOpenModalSettings] = useState<boolean>(false);
   const [openModalVariable, setOpenModalVariable] = useState<boolean>(false);

   //Todo: Ref
   const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

   //Todo: Api

   //Handle foreach edge type
   useEffect(() => {
      if (selectedEdge && selectedEdge.type === 'promptCollectEdge') {
         setOpenModalEditCheckIntent(true);
      }
   }, [selectedEdge]);

   //Update node when change in children
   useEffect(() => {
      setNodes((nds) =>
         nds.map((node) => {
            if (node.id === selectedNode?.id) {
               node = selectedNode;
            }
            return node;
         })
      );
   }, [selectedNode]);

   //#region Util of reactflow connect, delete, drag, keydown,...

   const onConnect = useCallback(async (params: Edge | Connection) => {
      if (params?.sourceHandle?.includes('prompt-and-collect')) {
         // setSelectedEdge(params)

         const tempId = crypto.randomUUID();
         selectedEdgeId.current = tempId;
         setSelectedEdge({
            ...params,
            source: params.source + '',
            target: params.target + '',
            type: 'promptCollectEdge',
            id: tempId,
            markerEnd: {
               type: MarkerType.ArrowClosed,
               width: 16,
               height: 16,
               color: '#333',
            },
         });

         setEdges((e) => {
            return [
               ...e,
               {
                  ...params,
                  source: params.source + '',
                  target: params.target + '',
                  type: 'promptCollectEdge',
                  id: tempId,
                  markerEnd: {
                     type: MarkerType.ArrowClosed,
                     width: 16,
                     height: 16,
                     color: '#333',
                  },
               },
            ];
         });
      } else {
         setEdges((e) => {
            return [
               ...e,
               {
                  ...params,
                  id: crypto.randomUUID(),
                  source: params.source + '',
                  target: params.target + '',
                  // type: 'promptCollectEdge',
                  markerEnd: {
                     type: MarkerType.ArrowClosed,
                     width: 16,
                     height: 16,
                     color: '#333',
                  },
               },
            ];
         });
      }
   }, []);

   const deleteEdgeById = (id: string) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== id));
   };

   const deleteNodeById = (id: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.target !== id || edge.source === id));
   };
   const onDragOver = useCallback((event: any) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
   }, []);

   const onKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
         const selectedEdges = edges.filter((el) => el.selected);
         if (selectedEdges.length > 0) {
            deleteEdgeById(selectedEdges[0].id);
         }
         const selectedNode = nodes.filter((el) => el.selected && el.id !== 'start-node');
         if (selectedNode.length > 0) {
            deleteNodeById(selectedNode[0].id);
         }
      }
   };

   const onDrop = useCallback(
      (event: React.DragEvent) => {
         if (reactFlowInstance && reactFlowWrapper.current) {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
               return;
            } else {
               const position = reactFlowInstance.project({
                  x: event.clientX - reactFlowBounds.left,
                  y: event.clientY - reactFlowBounds.top,
               });
               if (type === 'message') {
                  const newNode = {
                     id: crypto.randomUUID(),
                     type,
                     position,
                     data: {
                        name: 'Send A Message',
                        text: [],
                        type: type,
                        nextAction: '',
                     },
                  } as tSendAMessageNode;
                  setNodes((nds) => nds.concat(newNode));
               } else if (type === 'promptandcollect') {
                  const newNode = {
                     id: crypto.randomUUID(),
                     type,
                     position,
                     data: {
                        type: type,
                        name: 'Prompt & Collect',
                        text: [],
                        validateType: 'intent',
                        answer: '',
                        intent: '',
                        nextAction: [],
                     },
                  } as tPromptCollectNode;
                  setNodes((nds) => nds.concat(newNode));
               } else if (type === 'subflow') {
                  const newNode = {
                     id: crypto.randomUUID(),
                     type,
                     position,
                     data: {
                        flowId: '',
                        name: 'Subflow',
                        type: type,
                        nextAction: '',
                     },
                  } as tSubFlowNode;
                  setNodes((nds) => nds.concat(newNode));
               } else if (type === 'checkattribute') {
                  const newNode = {
                     id: crypto.randomUUID(),
                     type,
                     position,
                     data: {
                        type: type,
                        name: 'Check Variable',
                        attribute: 'string',
                        nextAction: [],
                     },
                  } as tCheckVariableNode;
                  setNodes((nds) => nds.concat(newNode));
               } else if (type === 'http') {
                  const newNode = {
                     id: crypto.randomUUID(),
                     type,
                     position,
                     data: {
                        type: type,
                        name: 'HTTP Request',
                        method: 'string',
                        url: 'string',
                        body: 'string',
                        headers: {
                           key: 'string',
                        },
                        params: {
                           key: 'string',
                        },
                        bodyType: 'string',
                        nextAction: [
                           {
                              case: 'string',
                              actionId: 'string',
                           },
                        ],
                     },
                  } as tHttpRequestNode;
                  setNodes((nds) => nds.concat(newNode));
               }
               // else {
               //    let newNode = {
               //       id: crypto.randomUUID(),
               //       type,
               //       position,
               //       data: {
               //          label: type,
               //       },
               //    };
               //    setNodes((nds) => nds.concat(newNode));
               // }
            }
         }
      },
      [reactFlowInstance]
   );
   //#endregion

   return (
      <>
         {openModalEditCheckIntent ? (
            <ModalEditCheckIntent
               setShowModal={(b) => setOpenModalEditCheckIntent(b)}
               edge={selectedEdge}
               edges={edges}
               open={openModalEditCheckIntent}
               setEdges={(edges) => setEdges(edges)}
            />
         ) : null}
         <SettingsModal
            setShowModal={(b) => setOpenModalSettings(b)}
            title={<h2>Settings</h2>}
            open={openModalSettings}
         />
         <Modal
            title={<h2>List Variable</h2>}
            open={openModalVariable}
            onCancel={() => setOpenModalVariable(false)}
         />
         <div className="playReactNode">
            <ModalEditNode
               hidden={selectedNode ? false : true}
               node={selectedNode ?? null}
               setNode={(node) => setSelectedNode(node)}
            />
            <ReactFlowProvider>
               <NavTopChatbot
                  setOpenSettings={(b) => setOpenModalSettings(b)}
                  setOpenVariable={(b) => setOpenModalVariable(b)}
               />
               <SideBar />
               <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                  <ReactFlow
                     onKeyDown={onKeyDown}
                     nodeTypes={nodeTypes}
                     edgeTypes={edgeTypes}
                     nodes={nodes}
                     edges={edges}
                     onEdgesDelete={(e) => {}}
                     onNodesChange={onNodesChange}
                     onEdgesChange={onEdgesChange}
                     onConnect={onConnect}
                     onInit={setReactFlowInstance}
                     onDrop={onDrop}
                     onDragOver={onDragOver}
                     onNodeDoubleClick={(event, curNode) => {
                        if (curNode.type === 'start-node' || curNode.id === 'start-node')
                           setSelectedNode(null);
                        else {
                           setSelectedNode(curNode);
                        }
                     }}
                     zoomOnDoubleClick
                     onEdgeDoubleClick={(_, e) => {
                        console.log('double clij');
                        if (e.type === 'promptCollectEdge') {
                           setSelectedEdge(e);
                           setOpenModalEditCheckIntent(true);
                        }
                     }}
                     onEdgeClick={(_, e) => {
                        // setSelectedEdge(e);
                     }}>
                     <Controls showZoom={true} showFitView={true} position="bottom-right" />
                  </ReactFlow>
               </div>
            </ReactFlowProvider>
         </div>
      </>
   );
};

export default DnDFlow;
