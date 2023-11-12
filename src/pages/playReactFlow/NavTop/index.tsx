import React, { useState } from 'react';

import './style.less';
import {
   CaretRightOutlined,
   ClockCircleOutlined,
   CodeFilled,
   CodeOutlined,
   FieldTimeOutlined,
   InteractionFilled,
   RightOutlined,
   SettingFilled,
   SettingOutlined,
} from '@ant-design/icons';
import { Button, Popover } from 'antd';
const NavTopChatbot: React.FC = () => {
   return (
      <div className={'nav-top-chatbot'}>
         <div className="breadcrumb">
            <span className="btn-back-create-page">Create ChatBot</span>
            <CaretRightOutlined className="icon" />
            <span>Chat-Bot-Name</span>
         </div>
         {/* <span
            className={'btn-expand-nav' + (expandNav ? ' -scroll' : '')}
            onClick={() => setExpandNav((pre) => !pre)}>
            <CaretRightOutlined />
         </span> */}
         <div className="menu-right">
            <div className="tool-list">
               <button className="tool-item">
                  <Popover placement="bottom" content={<h6>List variable</h6>}>
                     <CodeOutlined />
                  </Popover>
               </button>
               <button className="tool-item">
                  <Popover placement="bottom" content={<h6>Versions</h6>}>
                     <ClockCircleOutlined />
                  </Popover>
               </button>

               <button className="tool-item">
                  <Popover placement="bottom" content={<h6>Settings</h6>}>
                     <SettingOutlined />
                  </Popover>
               </button>
            </div>
            <div className="action-list">
               <Button className="action-item --test-your-bot">Test your bot</Button>
               <Button className="action-item" type="primary" disabled>
                  Save
               </Button>
               <Button className="action-item" type="primary" disabled>
                  Publish
               </Button>
            </div>
         </div>
      </div>
   );
};

export default NavTopChatbot;
