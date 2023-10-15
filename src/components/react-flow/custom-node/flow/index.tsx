import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

// const handleStyle = { left: 10 };

const FlowNode: React.FC<{ data: any }> = ({ data }) => {
   return (
      <>
         <Handle type="target" position={Position.Top} />
         <div>
            <label htmlFor="text">Flow</label>
         </div>
      </>
   );
};

export default FlowNode;
