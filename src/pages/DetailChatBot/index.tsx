import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
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
import SideBar from '@pages/DetailChatBot/SideBar';
import 'reactflow/dist/style.css';
import { nodeTypes, tLanguage, tListNodeData } from '@pages/DetailChatBot/CustomNode';

import ModalEditCheckIntent from './CustomEdge/ModalEditCheckIntent';
import { ListEdgeType, edgeTypes } from './CustomEdge/indext';

import ModalEditNode from './ModalEditNode';
import { PromptCollectData, tPromptCollectNode } from './CustomNode/PromptCollectNode';
import { SubFlowData, tSubFlowNode } from './CustomNode/SubFlowNode/indext';
import NavTopChatbot from './NavTop';
import { CheckVariableData, tCheckVariableNode } from './CustomNode/CheckVariable';
import { HttpRequestData, tHttpRequestNode } from './CustomNode/HttpRequestNode';
import { SendAMessageData, tSendAMessageNode } from './CustomNode/SendAMessageNode';
import { StartNodeData, tStartNode } from './CustomNode/StartNode';
import { Modal } from 'antd';
import { atom, useAtom } from 'jotai';
import SettingsModal from './SettingsModal';
import { useDetailFlowById } from '@hooks/flow/detailFlowById';
import { useParams } from 'react-router-dom';
import CustomPrompt from '@components/CustomPrompt';
import { iAttributes, iLanguageFollow } from '@hooks/flow';
import VariablesModal, { listVariableAtom } from './VariablesModal';

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

export const languagesAtom = atom<iLanguageFollow[]>([
   { value: 'en', label: 'English', default: true },
]);

export const haveFlowChangeAtom = atom<boolean>(false);

const DnDFlow: React.FC = () => {
   //Todo: State - ReactFlo w
   const { id } = useParams();
   const { data: detailFlowById } = useDetailFlowById(id);

   const [initialNodes, setInitialNodes] = useState<Node<tListNodeData>[]>([
      {
         id: 'start-node',
         type: 'start',
         data: { id: 'start-node', label: 'Start point', name: 'Start point', type: 'start' },
         position: { x: 250, y: 70 },
         deletable: false,
      } as tStartNode,
   ]);
   const [initialEdges, setInitialEdges] = useState<Edge[]>([]);

   const [nodes, setNodes, onNodesChange] = useNodesState<tListNodeData>(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

   const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
   const [selectedNode, setSelectedNode] = useState<Node<tListNodeData> | null>(null);
   const [selectedEdge, setSelectedEdge] = useState<Edge<ListEdgeType> | null>(null);
   const selectedEdgeId = useRef<string | null>(null);

   const [languages, setLanguages] = useAtom(languagesAtom);
   const [, setListVariable] = useAtom(listVariableAtom);
   const [_, setHaveFlowChange] = useAtom(haveFlowChangeAtom);
   //Todo: State - Another: modal,...
   const [openModalEditCheckIntent, setOpenModalEditCheckIntent] = useState<boolean>(false);
   const [openModalSettings, setOpenModalSettings] = useState<boolean>(false);
   const [openModalVariable, setOpenModalVariable] = useState<boolean>(false);

   //Todo: Ref
   const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

   //Todo: Api
   useLayoutEffect(() => {
      if (detailFlowById.data) {
         let tempNodes = JSON.parse(detailFlowById.data.diagram) as Node<tListNodeData>[];
         if (tempNodes.length > 0) {
            setInitialNodes([...tempNodes]);
         }
         let tempEdges = JSON.parse(detailFlowById.data.edges) as Edge[];
         if (tempEdges.length > 0) {
            setInitialEdges([...tempEdges]);
         }
         let tempLanguages = JSON.parse(detailFlowById.data.settings) as iLanguageFollow[];
         // settings: iLanguage[]
         if (tempLanguages.length > 0) {
            setLanguages([...tempLanguages]);
         }
         let tempVariables = JSON.parse(detailFlowById.data.attributes) as iAttributes[];
         if (tempVariables.length > 0) {
            setListVariable(tempVariables);
         }
      }
   }, []);
   useLayoutEffect(() => {
      setNodes(initialNodes);
   }, [initialNodes]);
   useLayoutEffect(() => {
      setEdges(initialEdges);
   }, [initialEdges]);

   useEffect(() => {
      if (
         JSON.stringify(initialNodes).length !== JSON.stringify(nodes).length ||
         JSON.stringify(initialNodes).length !== JSON.stringify(edges).length
      ) {
         setHaveFlowChange(true);
      }
   }, [nodes, edges]);
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

   //Update next action when edges have any change
   useEffect(() => {
      const temp = nodes.map((item) => {
         switch (item.data.type) {
            case 'promptandcollect': {
               let tempNode = item as Node<PromptCollectData>;
               let tempNextAction = [];
               edges.map((e) => {
                  if (tempNode.data.id === e.source) {
                     if (e.data?.condition) {
                        if (e.data?.condition === 'other') {
                           tempNextAction = tempNextAction.concat({
                              case: e.data.condition,
                              actionId: e.target,
                           });
                        } else if (e.data?.condition === 'Not match') {
                           tempNextAction = tempNextAction.concat({
                              case: e.data.condition,
                              actionId: e.target,
                           });
                        } else {
                           tempNextAction = tempNextAction.concat({
                              case: `${e.data.condition}: ${e.data.intent}`,
                              actionId: e.target,
                           });
                        }
                     }
                  }
               });
               return {
                  ...tempNode,
                  data: {
                     ...tempNode.data,
                     nextAction: tempNextAction,
                  },
               };
            }
            case 'checkattribute': {
               let tempNode = item as Node<CheckVariableData>;
               let tempNextAction = [];
               edges.map((e) => {
                  if (tempNode.data.id === e.source) {
                     if (e.data?.condition) {
                        if (e.data?.condition === 'other') {
                           tempNextAction = tempNextAction.concat({
                              case: e.data.condition,
                              actionId: e.target,
                           });
                        } else if (e.data?.condition === 'Not match') {
                           tempNextAction = tempNextAction.concat({
                              case: e.data.condition,
                              actionId: e.target,
                           });
                        } else {
                           tempNextAction = tempNextAction.concat({
                              case: `${e.data.condition}: ${e.data.intent}`,
                              actionId: e.target,
                           });
                        }
                     }
                  }
               });
               return {
                  ...tempNode,
                  data: {
                     ...tempNode.data,
                     nextAction: tempNextAction,
                  },
               };
            }
            case 'http': {
               let tempNode = item as Node<HttpRequestData>;
               let tempNextAction = [];
               edges.map((e) => {
                  if (tempNode.data.id === e.source) {
                     if (e.data?.condition) {
                        if (e.data?.condition === 'failed') {
                           tempNextAction = tempNextAction.concat({
                              case: 'failed',
                              actionId: e.target,
                           });
                        } else if (e.data?.condition === 'success') {
                           tempNextAction = tempNextAction.concat({
                              case: 'success',
                              actionId: e.target,
                           });
                        }
                     }
                  }
               });
               return {
                  ...tempNode,
                  data: {
                     ...tempNode.data,
                     nextAction: tempNextAction,
                  },
               };
            }
            case 'message': {
               let tempNode = item as Node<SendAMessageData>;
               return tempNode;
            }
            case 'start': {
               let tempNode = item as Node<StartNodeData>;
               return tempNode;
            }
            case 'subflow': {
               let tempNode = item as Node<SubFlowData>;
               return tempNode;
            }
         }
      });
      setNodes(temp);
   }, [edges]);
   //#region Util of reactflow connect, delete, drag, keydown,...

   const onConnect = useCallback(
      async (params: Edge | Connection) => {
         const httpRequestId = crypto.randomUUID();

         if (
            params?.sourceHandle?.includes('prompt-and-collect') ||
            params?.sourceHandle?.includes('check-variable')
         ) {
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
         } else if (params?.sourceHandle?.includes('http-request')) {
            setEdges((e) => {
               return [
                  ...e,
                  {
                     ...params,
                     source: params.source + '',
                     target: params.target + '',
                     type: 'promptCollectEdge',
                     id: httpRequestId,
                     label: params.sourceHandle === 'http-request-failed' ? 'Failed' : 'Success',
                     data: {
                        condition:
                           params.sourceHandle === 'http-request-failed' ? 'failed' : 'success',
                     },
                     markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 16,
                        height: 16,
                        color: '#333',
                     },
                  },
               ];
            });
            //    label:
            //    edge.sourceHandle !== 'prompt-and-collect-false' &&
            //    edge.sourceHandle !== 'check-variable-false'
            //       ? `${condition}: ${intent}`
            //       : getLabelByValue(condition),
            // data: {
            //    condition: condition,
            //    intent: intent,
            // },
         } else {
            const id = crypto.randomUUID();
            setEdges((e) => {
               return [
                  ...e,
                  {
                     ...params,
                     id: id,
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
            // const itemList = nodes.map((node) => {
            //    if (node.id === id) {
            //       return {
            //          ...node,
            //          data: {
            //             ...node.data,
            //          },
            //       };
            //    }
            // });
         }
         nodes.map((item) => {
            if (item.id === params.source) {
               switch (item.data.type) {
                  // case 'checkattribute': {
                  //    const asNode = item as Node<CheckVariableData>;
                  //    break;
                  // }

                  case 'http': {
                     const asNode = item as Node<HttpRequestData>;
                     if (
                        asNode.data?.nextAction !== undefined &&
                        asNode.data.nextAction.length > 0
                     ) {
                        setEdges((pre) => {
                           return pre.filter((edg) => {
                              if (edg.source !== asNode.data.id) {
                                 return edg; // Giữ lại những cạnh không phải của node này - xóa tất cả các cạnh của node này
                              } else if (
                                 edg.id === httpRequestId || // Giữ lại cạnh vừa tạo
                                 (params.sourceHandle === 'http-request-failed' && // Giữ lại cạnh không phải là handle vừa tạo
                                    edg.sourceHandle !== 'http-request-failed') ||
                                 (params.sourceHandle === 'http-request-success' &&
                                    edg.sourceHandle !== 'http-request-success')
                              )
                                 return edg;
                              else {
                              }
                           });
                        });
                     }

                     // asNode.data.nextAction = params.target;
                     return asNode;
                  }
                  case 'message': {
                     const asNode = item as Node<SendAMessageData>;
                     if (
                        asNode.data?.nextAction !== undefined &&
                        asNode.data.nextAction.length > 0
                     ) {
                        setEdges((pre) => {
                           return pre.filter((item) => {
                              if (
                                 item.source !== asNode.data.id ||
                                 (item.source === asNode.data.id &&
                                    item.target === params.target &&
                                    item.sourceHandle === params.sourceHandle &&
                                    item.targetHandle === params.targetHandle)
                              )
                                 return item;
                           });
                        });
                     }
                     asNode.data.nextAction = params.target;
                     return asNode;
                  }
                  case 'start': {
                     let asNode = item as Node<StartNodeData>;
                     if (
                        asNode.data?.nextAction !== undefined &&
                        asNode.data.nextAction.length > 0
                     ) {
                        setEdges((pre) => {
                           return pre.filter((item) => {
                              if (
                                 item.source !== asNode.data.id ||
                                 (item.source === asNode.data.id && item.target === params.target)
                              )
                                 return item;
                           });
                        });
                     }
                     asNode.data.nextAction = params.target;
                     return asNode;
                  }
                  case 'subflow': {
                     const asNode = item as Node<SubFlowData>;
                     if (
                        asNode.data?.nextAction !== undefined &&
                        asNode.data.nextAction.length > 0
                     ) {
                        setEdges((pre) => {
                           return pre.filter((item) => {
                              if (
                                 item.source !== asNode.data.id ||
                                 (item.source === asNode.data.id &&
                                    item.target === params.target &&
                                    item.sourceHandle === params.sourceHandle &&
                                    item.targetHandle === params.targetHandle)
                              )
                                 return item;
                           });
                        });
                     }
                     asNode.data.nextAction = params.target;
                     return asNode;
                  }
                  default: {
                  }
               }
            }
         });
      },
      [nodes]
   );
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
               const id = crypto.randomUUID();
               if (type === 'message') {
                  const newNode = {
                     id,
                     type,
                     position,
                     data: {
                        id,
                        name: 'Send A Message',
                        text: [],
                        type: type,
                        buttons: [],
                        nextAction: '',
                     },
                  } as tSendAMessageNode;
                  setNodes((nds) => nds.concat(newNode));
               } else if (type === 'promptandcollect') {
                  const newNode = {
                     id,
                     type,
                     position,
                     data: {
                        id,
                        type: type,
                        name: 'Prompt & Collect',
                        notmatchprompts: [],
                        text: [],
                        repeat: 0,
                        validateType: 'none',
                        answer: {},
                        intent: '',
                        nextAction: [],
                        extend: [],
                        prompt_type: 'normal',
                     },
                  } as tPromptCollectNode;
                  setNodes((nds) => nds.concat(newNode));
               } else if (type === 'subflow') {
                  const newNode = {
                     id,
                     type,
                     position,
                     data: {
                        id,
                        flowId: undefined,
                        name: 'Subflow',
                        type: type,
                        nextAction: '',
                     },
                  } as tSubFlowNode;
                  setNodes((nds) => nds.concat(newNode));
               } else if (type === 'checkattribute') {
                  const newNode = {
                     id,
                     type,
                     position,
                     data: {
                        id,
                        type: type,
                        name: 'Check Variable',
                        attribute: undefined,
                        nextAction: [],
                     },
                  } as tCheckVariableNode;
                  setNodes((nds) => nds.concat(newNode));
               } else if (type === 'http') {
                  const newNode = {
                     id,
                     type,
                     position,
                     data: {
                        id,
                        type: type,
                        name: 'HTTP Request',
                        method: 'GET',
                        url: '',
                        body: [],
                        headers: [],
                        params: [],
                        response: '',
                        bodyType: '',
                        nextAction: [],
                     },
                  } as tHttpRequestNode;
                  setNodes((nds) => nds.concat(newNode));
               }
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
               nodes={nodes}
               setNodes={(nodes) => setNodes(nodes)}
               setShowModal={(b) => setOpenModalEditCheckIntent(b)}
               edge={selectedEdge}
               edges={edges}
               open={openModalEditCheckIntent}
               setEdges={(edges) => setEdges(edges)}
            />
         ) : null}
         <SettingsModal
            nodes={nodes}
            setNodes={(n) => setNodes(n)}
            setShowModal={(b) => setOpenModalSettings(b)}
            title={<h2>Settings</h2>}
            open={openModalSettings}
         />
         <VariablesModal setShowModal={(b) => setOpenModalVariable(b)} open={openModalVariable} />
         <CustomPrompt
            isBlocked={true}
            title={'Do you want exit page?'}
            subTitle={
               'Any changes you made may not be saved! Please, click save button before you leave.'
            }
         />

         <div className="playReactNode">
            <ModalEditNode
               hidden={selectedNode ? false : true}
               node={selectedNode ?? null}
               setNode={(node) => setSelectedNode(node)}
            />
            <ReactFlowProvider>
               <NavTopChatbot
                  nodes={nodes}
                  edges={edges}
                  detailFlowById={detailFlowById.data}
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
                        if (e.type === 'promptCollectEdge') {
                           setSelectedEdge(e);
                           setOpenModalEditCheckIntent(true);
                        }
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
