import React, { useState, useRef, useCallback, useMemo } from 'react';
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
import SideBar from '@components/ReactFlow/SideBar';
import 'reactflow/dist/style.css';
import FlowNode from '@components/ReactFlow/CustomNode/Flow';

const initialNodes = [
   {
      id: '1',
      type: 'input',
      data: { label: 'input node' },
      position: { x: 250, y: 5 },
   },
];
let id = 0;
const getId = () => `dndnode_${id++}`;
const DnDFlow: React.FC = () => {
   const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
   const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

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
            const newNode = {
               id: getId(),
               type,
               position,
               data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
         }
      },
      [reactFlowInstance]
   );
   const nodeTypes = useMemo(() => ({ flowNode: FlowNode }), []);

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
                  onDragOver={onDragOver}>
                  <Controls />
               </ReactFlow>
            </div>
         </ReactFlowProvider>
      </div>
   );
};

export default DnDFlow;
