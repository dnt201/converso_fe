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
import { nodeTypes, tListNodeData } from '@pages/PlayReactFlow/CustomNode';
import { SendAMessageData, SendAMessageNode } from './CustomNode/SendAMessageNode';
import {} from 'reactflow';
import ModalEditCheckIntent, { iValueEdgePromptCollect } from './ModalEditCheckIntent';
import { edgeTypes } from './CustomEdge/indext';
import { PromptCollectNode } from './CustomNode/PromptCollectNode';
import ModalEditNode from './ModalEditNode';

const initialNodes = [
   {
      id: 'start-node',
      type: 'start',
      data: { label: 'Start point' },
      position: { x: 250, y: 5 },
      deletable: false,
   },
   {
      id: 'prompt',
      type: 'promptCollect',
      data: { label: 'promptCollect' },
      position: { x: 250, y: 150 },
      deletable: false,
   },
   {
      id: 'message',
      type: 'sendAMessage',
      data: { label: 'sendAMessage' },
      position: { x: 250, y: 250 },
      deletable: false,
   },
];
const initialEdges = [
   {
      data: { intent: '1', condition: 'equal' },

      id: 'e1-2',
      source: 'prompt',
      sourceHandle: 'prompt-and-collect-true',
      target: 'message',
      targetHandle: 'target-top',
      type: 'promptCollectEdge',
   },
   {
      data: { intent: '51', condition: 'equal' },

      id: 'e22',
      source: 'prompt',
      sourceHandle: 'prompt-and-collect-true',
      target: 'message',
      targetHandle: 'target-top',
      type: 'promptCollectEdge',
   },
];

let id = 0;
const getId = () => `dndnode_${id++}`;
const DnDFlow: React.FC = () => {
   const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
   const [nodes, setNodes, onNodesChange] = useNodesState<tListNodeData | { label: string }>(
      initialNodes
   );
   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
   const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

   const [openModalEditCheckIntent, setOpenModalEditCheckIntent] = useState<boolean>(false);
   const [selectedNode, setSelectedNode] = useState<Node<tListNodeData> | null>(null);
   const selectedEdgeId = useRef<string | null>(null);
   const [curValueCheckIntent, setCurValueCheckIntent] = useState<iValueEdgePromptCollect | null>(
      null
   );

   useEffect(() => {
      // console.log(edges);
   }, [edges]);

   const onConnect = useCallback(async (params: Edge | Connection) => {
      if (params?.sourceHandle?.includes('prompt-and-collect')) {
         const tempId = crypto.randomUUID();
         selectedEdgeId.current = tempId;
         setOpenModalEditCheckIntent(true);
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
                  type: 'promptCollectEdge',
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
            }
            const position = reactFlowInstance.project({
               x: event.clientX - reactFlowBounds.left,
               y: event.clientY - reactFlowBounds.top,
            });

            if (type === 'sendAMessage') {
               let newNode = {
                  id: getId(),
                  type,
                  position,
                  data: {
                     name: '',
                     text: [],
                     type: '',
                     nextAction: '',
                  },
               } as SendAMessageNode;
               setNodes((nds) => nds.concat(newNode));
            } else if (type === 'promptCollect') {
               let newNode = {
                  id: getId(),
                  type,
                  position,
                  data: {
                     name: '',
                     text: [],
                     type: '',
                     nextAction: '',
                  },
               } as SendAMessageNode;
               setNodes((nds) => nds.concat(newNode));
            }
         }
      },
      [reactFlowInstance]
   );
   console.log('rerender');
   // const nodeTypes = useMemo(() => (nodeTypesCustom), []);
   return (
      <div className="playReactNode">
         <ModalEditNode
            hidden={selectedNode ? false : true}
            node={selectedNode ?? null}
            setNode={(node) => setSelectedNode(node)}
         />

         <ReactFlowProvider>
            <SideBar />
            <ModalEditCheckIntent
               open={openModalEditCheckIntent}
               dataEdge={curValueCheckIntent}
               setDataEdge={(c) => {
                  setCurValueCheckIntent(c);
               }}
               onCancel={() => {
                  if (selectedEdgeId.current) deleteEdgeById(selectedEdgeId.current);
                  setOpenModalEditCheckIntent(false);
               }}
               onOk={() => {
                  if (selectedEdgeId.current) {
                     // let objIndex = edges.findIndex((obj) => obj.id === selectedEdgeId.current);

                     const temp = edges.map((item) => {
                        if (item.id === selectedEdgeId.current) {
                           return {
                              ...item,
                              label: (
                                 <span>
                                    <b>{curValueCheckIntent?.condition}</b>:{' '}
                                    {curValueCheckIntent?.intent}
                                 </span>
                              ),
                              data: {
                                 condition: curValueCheckIntent?.condition,
                                 intent: curValueCheckIntent?.intent,
                              },
                           };
                        }
                        return item;
                     });
                     setEdges(temp);
                     // edges[objIndex] = {
                     //    ...edges[objIndex],
                     // };
                  }
                  setCurValueCheckIntent(null);
                  setOpenModalEditCheckIntent(false);
               }}
            />
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
                     if (curNode.type === 'promptCollect') setSelectedNode(curNode);
                  }}
                  onEdgeDoubleClick={(_, e) => {
                     e.type === '';
                  }}
                  onNodeClick={(_, curNode) => {
                     // setSelectedNode(nodes.filter((nds) => nds.id === id)[0]);
                  }}
                  onEdgeClick={() => {}}>
                  <Controls showZoom={true} showFitView={true} position="bottom-right" />
               </ReactFlow>
            </div>
         </ReactFlowProvider>
      </div>
   );
};

export default DnDFlow;
