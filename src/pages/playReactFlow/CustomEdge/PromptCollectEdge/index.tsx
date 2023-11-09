import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

import './style.less';

const onEdgeClick = (evt: React.MouseEvent, id: string) => {
   evt.stopPropagation();
   alert(`remove ${id}`);
};

const PromptCollectEdge: React.FC<EdgeProps> = ({
   id,
   sourceX,
   sourceY,
   targetX,
   targetY,
   sourcePosition,
   targetPosition,
   style = {},
   markerEnd,
}: EdgeProps) => {
   const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
   });

   return (
      <>
         <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
         <EdgeLabelRenderer>
            <div
               style={{
                  position: 'absolute',
                  transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                  fontSize: 12,
                  pointerEvents: 'all',
               }}
               className="nodrag nopan">
               <button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
                  ×
               </button>
            </div>
         </EdgeLabelRenderer>
      </>
   );
};

export default PromptCollectEdge;
