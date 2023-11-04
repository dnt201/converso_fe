import React from 'react';
import { listNodes, nodeTypes } from '../CustomNode';

const SideBar: React.FC = () => {
   const onDragStart = (event: React.DragEvent, nodeType: string) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
   };

   return (
      <aside>
         <div className="description">You can drag these nodes to the pane on the right.</div>
         <div
            className="dndnode input"
            onDragStart={(event) => onDragStart(event, 'input')}
            draggable>
            Input Node
         </div>
         <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Default Node
         </div>
         <div
            className="dndnode output"
            onDragStart={(event) => onDragStart(event, 'output')}
            draggable>
            Output Node
         </div>
         {listNodes.map((item) => {
            return (
               <div
                  key={item.value}
                  className="dndnode"
                  onDragStart={(event) => onDragStart(event, item.value)}
                  draggable>
                  {item.icon}
                  <span>{item.label}</span>
               </div>
            );
         })}
      </aside>
   );
};

export default SideBar;
