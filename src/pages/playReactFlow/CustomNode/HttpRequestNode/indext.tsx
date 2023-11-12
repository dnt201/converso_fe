{
}

import { Handle, Node, NodeProps, Position } from 'reactflow';
import { tLanguage } from '..';
import './style.less';
import { BuildFilled, MessageFilled, MessageOutlined } from '@ant-design/icons';
import { Space } from 'antd';

//User Input

export interface HttpRequestData {
   type: string;
   name: string;
   method: string;
   url: string;
   body: string;
   headers: {
      key: string;
   };
   params: {
      key: string;
   };
   bodyType: string;
   nextAction: {
      case: string;
      actionId: string;
   }[];
}

export type tHttpRequestNode = Node<HttpRequestData>;

const HttpRequestNode = () => {
   return (
      <div className="node http-request-node">
         <Handle className="handle-target" id="target-top" type="target" position={Position.Top} />
         <Handle className="handle-target" id="source-top" type="source" position={Position.Top} />
         <Handle
            className="handle-target"
            id="target-left"
            type="target"
            position={Position.Left}
         />
         <Handle
            className="handle-target"
            id="source-left"
            type="source"
            position={Position.Left}
         />
         <Handle
            className="handle-target"
            id="target-right"
            type="target"
            position={Position.Right}
         />
         <Handle
            className="handle-target"
            id="source-right"
            type="source"
            position={Position.Right}
         />
         <Handle
            className="handle-target"
            id="target-bottom"
            type={'target'}
            position={Position.Bottom}
         />{' '}
         <Handle
            className="handle-target"
            id="source-bottom"
            type={'source'}
            position={Position.Bottom}
         />
         <div className="content">
            <i className="icon">
               <BuildFilled />
            </i>
            <label className="label">HTTP Request</label>
         </div>
      </div>
   );
};

export default HttpRequestNode;
