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

const initialNodes = [
   {
      id: 'start-node',
      type: 'start',
      data: { id: 'start-node', label: 'Start point', name: 'Start point', type: 'start' },
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
   //Todo: State - ReactFlo w
   const { id } = useParams();

   const [nodes, setNodes, onNodesChange] = useNodesState<tListNodeData>(initialNodes);
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
   const { data: detailFlowById } = useDetailFlowById(id);

   useEffect(() => {
      if (detailFlowById.data) {
         console.log(detailFlowById.data.diagram);
         if (detailFlowById.data.diagram.length >= 0) setNodes(detailFlowById.data.diagram);
      }
   }, [detailFlowById]);
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
               return {
                  ...tempNode,
                  data: {
                     ...tempNode.data,
                     nextAction: edges.map((e) => {
                        if (tempNode.data?.id === e.source) {
                           if (e.data?.condition === 'other') {
                              return { case: 'other', actionId: e.target };
                           } else {
                              return {
                                 case: `${e.data?.condition}: ${e.data?.intent}`,
                                 actionId: e.target,
                              };
                           }
                        }
                     }),
                  },
               };
            }
            case 'checkattribute': {
               let tempNode = item as Node<CheckVariableData>;
               return tempNode;
            }
            case 'http': {
               let tempNode = item as Node<HttpRequestData>;
               return tempNode;
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
                  case 'checkattribute': {
                     const asNode = item as Node<CheckVariableData>;
                     break;
                  }

                  case 'http': {
                     const asNode = item as Node<HttpRequestData>;
                     // if (
                     //    asNode.data?.nextAction !== undefined &&
                     //    asNode.data.nextAction.length > 0
                     // ) {
                     //    setEdges((pre) => {
                     //       return pre.filter((item) => {
                     //          if (
                     //             item.source !== asNode.data.id ||
                     //             (item.source === asNode.data.id && item.target === params.target)
                     //          )
                     //             return item;
                     //       });
                     //    });
                     // }
                     // asNode.data.nextAction = params.target;
                     // return asNode;
                     break;
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
                        text: [],
                        validateType: 'intent',
                        answer: '',
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

                        flowId: '',
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
                        attribute: 'string',
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
                        url: 'string',
                        body: [],
                        headers: [],
                        params: [],
                        bodyType: 'string',
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
         <CustomPrompt
            isBlocked={true}
            title={'Do you want exit page?'}
            subTitle={
               'Any changes you made may not be saved! Please, click save button before you leave.'
            }
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
