import { Handle, Position } from 'reactflow';
import { NotificationOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface NotifyAgentProps {
   id: string;
   data: {
      deleteNode: (id: string) => void;
   };
}

const NotifyAgent: React.FC<NotifyAgentProps> = (props) => {
   const { id, data } = props;

   return (
      <div className="node-wrapper flex-center">
         <div className="node-title flex-center">
            <NotificationOutlined />
            Notify Agent
         </div>
         <Handle id="notify-input-handle" type="target" position={Position.Left} />
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

export default NotifyAgent;
