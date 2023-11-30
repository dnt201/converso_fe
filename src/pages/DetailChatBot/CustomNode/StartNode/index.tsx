import { Handle, Node, NodeProps, Position } from 'reactflow';
import './style.less';
import { HomeFilled } from '@ant-design/icons';
import { Popover } from 'antd';

//User Input

export interface StartNodeData {
   name: string;
   label: string;
   type: string;
}

export type tStartNodeProps = NodeProps<StartNodeData>;
export type tStartNode = Node<StartNodeData>;

const StartNode: React.FC<tStartNodeProps> = () => (
   <Popover
      content={
         <p style={{ fontSize: '12px', width: '250px', textAlign: 'center' }}>
            <b>Start point</b> is a trigger point that show where your Story begins. It can't be
            edited. Connect actions and interactions after the <b>Start point</b> block to kick off
            your story.
         </p>
      }
      trigger="click"
      className="">
      <div className="node start-node">
         <Handle
            onClick={(e) => {
               e.stopPropagation();
            }}
            className="handle-target"
            type="source"
            position={Position.Bottom}
         />
         <div className="content">
            <i className="icon">
               <HomeFilled />
            </i>
            <label className="label"> Start point</label>
         </div>
      </div>
   </Popover>
);

export default StartNode;
