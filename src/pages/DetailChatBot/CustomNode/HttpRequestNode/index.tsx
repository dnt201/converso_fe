{
}

import { Handle, Node, NodeProps, Position } from 'reactflow';
import './style.less';
import { BuildFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { TypeOfNode } from '..';

//User Input

export type HttpRequest_Type = 'GET' | 'POST' | 'PUT';

export interface HttpRequestData {
   id: string;
   type: TypeOfNode;
   name: string;
   method: HttpRequest_Type;
   url: string;
   headers: { label: string; value: string | number }[];
   params: { label: string; value: string | number }[];
   bodyType: string;
   response: string;
   body: { label: string; value: string | number }[];
   nextAction: {
      case: 'failed' | 'success';
      actionId: string;
   }[];
}

export type tHttpRequestProps = NodeProps<HttpRequestData>;
export type tHttpRequestNode = Node<HttpRequestData>;

const HttpRequestNode: React.FC<tHttpRequestProps> = (props) => {
   return (
      <div className="node http-request-node">
         <Handle className="handle-target" id="source-top" type="target" position={Position.Top} />

         <Handle
            className="handle-target-false"
            id="http-request-failed"
            style={{
               left: '25%',
            }}
            type="source"
            position={Position.Bottom}>
            <i className="icon">
               <CloseOutlined />
            </i>
         </Handle>
         <Handle
            className="handle-target-true"
            id="http-request-success"
            style={{
               left: '75%',
            }}
            type="source"
            position={Position.Bottom}>
            <i className="icon">
               <CheckOutlined />
            </i>
         </Handle>
         <div className="content">
            <i className="icon">
               <BuildFilled />
            </i>
            <label className="label">{props.data.name}</label>
         </div>
      </div>
   );
};

export default HttpRequestNode;

