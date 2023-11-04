import { Handle, Position } from 'reactflow';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface ReceiveNodeProps {
   id: string;
   data: {
      output: {
         variable?: string;
      };
      type: string;
      syncData: (id: string, data: { output: { variable?: string } }) => void;
   };
   isConnectable: boolean;
}

const ReceiveNode: React.FC<ReceiveNodeProps> = (props) => {
   const { id, data, isConnectable } = props;

   useEffect(() => {
      if (!data?.output?.variable) {
         data.syncData(id, {
            output: { variable: crypto.randomUUID() },
         });
      }
   });

   return (
      <div className="node-wrapper flex-center">
         <div className="node-title flex-center">
            <PlayCircleOutlined />
            Receive {data?.type}
         </div>
         <Handle
            id="receive-output-handle"
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
         />
      </div>
   );
};

export default ReceiveNode;
