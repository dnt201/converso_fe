import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
   ReactFlowProvider,
   addEdge,
   useNodesState,
   useEdgesState,
   Controls,
   Connection,
   Edge,
   ReactFlowInstance,
   useKeyPress,
   MarkerType,
} from 'reactflow';
import './style.less';
import SideBar from '@pages/PlayReactFlow/SideBar';
import 'reactflow/dist/style.css';
import { nodeTypes } from '@pages/PlayReactFlow/CustomNode';
import { SendAMessageData, SendAMessageNode } from './CustomNode/SendAMessageNode';
import { notification } from 'antd';
import {} from 'reactflow';

const initialNodes = [
   {
      id: 'start-node',
      type: 'start',
      data: { label: 'Start point' },
      position: { x: 250, y: 5 },
      deletable: false,
   },
];

let id = 0;
const getId = () => `dndnode_${id++}`;
const DnDFlow: React.FC = () => {
   const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
   const [nodes, setNodes, onNodesChange] = useNodesState<SendAMessageData | { label: string }>(
      initialNodes
   );
   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
   const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

   const [selectedNode, setSelectedNode] = useState(null);
   // const [selectedEdge, setSelectedEdge] = useState<string | null>(null);

   const onConnect = useCallback(async (params: Edge | Connection) => {
      console.log(params, edges);
      let a = '';
      if (params?.sourceHandle?.includes('prompt-and-collect')) {
         a = (await prompt('Enter your intent')) ?? '';
         if (a.length > 0) {
            setEdges((eds: Edge[]) =>
               addEdge(
                  {
                     ...params,
                     label: a,
                     markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 16,
                        height: 16,
                        color: '#333',
                     },
                  },
                  eds
               )
            );
         }
      } else
         setEdges((eds: Edge[]) =>
            addEdge(
               {
                  ...params,
                  markerEnd: {
                     type: MarkerType.ArrowClosed,
                     width: 16,
                     height: 16,
                     color: '#333',
                  },
               },
               eds
            )
         );
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
   // const nodeTypes = useMemo(() => (nodeTypesCustom), []);

   return (
      <div className="playReactNode">
         <ReactFlowProvider>
            <SideBar />

            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
               <ReactFlow
                  onKeyDown={onKeyDown}
                  nodeTypes={nodeTypes}
                  nodes={nodes}
                  edges={edges}
                  onEdgesDelete={(e) => {
                     console.log(e);
                  }}
                  onEdgeUpdateStart={() => {
                     console.log('start');
                  }}
                  onEdgeUpdate={() => {
                     console.log('on e update');
                  }}
                  onEdgeUpdateEnd={() => {
                     console.log('end');
                  }}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onNodeClick={(_, curNode) => {
                     console.log(curNode);

                     // setSelectedNode(nodes.filter((nds) => nds.id === id)[0]);
                  }}
                  onEdgeClick={() => {
                     console.log(edges);
                  }}>
                  <Controls showZoom={true} showFitView={true} position="bottom-right" />
               </ReactFlow>
            </div>
         </ReactFlowProvider>
      </div>
   );
};

export default DnDFlow;
