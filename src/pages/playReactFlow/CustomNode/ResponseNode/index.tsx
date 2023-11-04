import { Handle, Position } from 'reactflow';
import { MessageOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface ResponseNodeProps {
   id: string;
   data: {
      notifyAgent: boolean | null | undefined;
      selectedNode?: {
         id: string;
      };
      syncData: (id: string, data: { notifyAgent: boolean }) => void;
      deleteNode: (id: string) => void;
   };
}

const ResponseNode: React.FC<ResponseNodeProps> = (props) => {
   const { id, data } = props;

   useEffect(() => {
      if (data?.notifyAgent === null || data?.notifyAgent === undefined) {
         data?.syncData(id, {
            notifyAgent: true,
         });
      }
   });

   return (
      <div
         className="node-wrapper flex-center"
         style={{
            backgroundColor: data?.selectedNode?.id === id ? 'var(--gray-layout-color)' : '#fff',
         }}>
         <div className="node-title flex-center">
            <MessageOutlined />
            Respond
         </div>
         <Handle id="resp-input-handle" type="target" position={Position.Left} />
         <CloseCircleOutlined
            className="node-close-btn"
            onClick={(e) => {
               e.stopPropagation();
               data.deleteNode(id);
            }}
         />
      </div>
   );
};

export default ResponseNode;
