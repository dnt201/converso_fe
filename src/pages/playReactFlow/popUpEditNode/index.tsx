import React from 'react';
import { Node } from 'reactflow';
import './style.less';
import { Input } from 'antd';

interface PopUpEditNodeProps {
   node: Node;
   setNode: (curNode: Node) => void;
}
const PopUpEditNode: React.FC<PopUpEditNodeProps> = (props) => {
   const { setNode } = props;
   return (
      <div className="popUpEditNode">
         <h6>
            <Input
               defaultValue={props.node.data.label}
               onChange={(d) => {
                  setNode({ ...props.node, data: { label: d.target.value } });
               }}
            />
            Current node Id:
            {props.node.id}
         </h6>
      </div>
   );
};

export default PopUpEditNode;
