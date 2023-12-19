import React, { useState } from 'react';
import { listNodes } from '../CustomNode';

import './style.less';
import { CaretRightOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
const SideBar: React.FC = () => {
   const [expandNav, setExpandNav] = useState(false);

   const onDragStart = (event: React.DragEvent, nodeType: string) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
   };

   return (
      <div className={'side-bar' + (expandNav ? ' expand' : '')}>
         <span
            className={'btn-expand-nav' + (expandNav ? ' -scroll' : '')}
            onClick={() => setExpandNav((pre) => !pre)}>
            <CaretRightOutlined />
         </span>
         {/* <div className="description">You can drag these nodes to the pane on the right.</div> */}
         <div className="list-node">
            {listNodes.map((item) => {
               return (
                  <div
                     className={'node-container' + (expandNav ? ' expand' : ' no-expand')}
                     key={item.value}
                     onDragStart={(event) => onDragStart(event, item.value)}
                     draggable>
                     {expandNav ? (
                        <>
                           <i className="icon">{item.icon}</i>
                           <span className={'label'}>{item.label}</span>
                        </>
                     ) : (
                        <Popover
                           content={<b>{item.label}</b>}
                           style={{ left: -100 }}
                           placement="right">
                           <i className="icon">{item.icon}</i>
                        </Popover>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default SideBar;
