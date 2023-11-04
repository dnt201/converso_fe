import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
   ReactFlowProvider,
   addEdge,
   useNodesState,
   useEdgesState,
   Controls,
   Connection,
   Edge,
   ReactFlowInstance,
} from 'reactflow';
import './style.less';
import SideBar from '@pages/PlayReactFlow/SideBar';
import 'reactflow/dist/style.css';
import { nodeTypes } from '@pages/PlayReactFlow/CustomNode';
import { SendAMessageData } from './CustomNode/SendAMessageNode';

const initialNodes = [
   {
      id: '1',
      type: 'input',
      data: { label: 'input node' },
      position: { x: 250, y: 5 },
   },
   {
      id: '2',
      type: 'sendAMessage',
      data: { label: 'sendAMessage node', number: 1 },
      position: { x: 150, y: 0 },
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

   const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
      []
   );

   const onDragOver = useCallback((event: any) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
   }, []);

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

            var newNode = {
               id: getId(),
               type,
               position,
               data: { label: `${type} node`, number: 12 },
            };

            setNodes((nds) => nds.concat(newNode));
         }
      },
      [reactFlowInstance]
   );
   // const nodeTypes = useMemo(() => (nodeTypesCustom), []);

   return (
      <div className="dndflow">
         <ReactFlowProvider>
            <SideBar />

            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
               <ReactFlow
                  nodeTypes={nodeTypes}
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onNodeClick={(_, curNode) => {
                     console.log(curNode);

                     // setSelectedNode(nodes.filter((nds) => nds.id === id)[0]);
                  }}>
                  <Controls />
               </ReactFlow>
            </div>
         </ReactFlowProvider>
      </div>
   );
};

export default DnDFlow;
