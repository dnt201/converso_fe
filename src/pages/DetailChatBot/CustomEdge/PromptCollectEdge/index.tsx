import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

import './style.less';
import { iValueEdgePromptCollect } from '@pages/DetailChatBot/CustomEdge/ModalEditCheckIntent';

// const onEdgeClick = (evt: React.MouseEvent, id: string) => {
//    evt.stopPropagation();
//    alert(`remove ${id}`);
// };

const PromptCollectEdge: React.FC<EdgeProps<iValueEdgePromptCollect>> = (props) => {
   const {
      // id,
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      style = {},
      markerEnd,
      // data,
   } = props;
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
               {props.label}
            </div>
         </EdgeLabelRenderer>
      </>
   );
};

export default PromptCollectEdge;
