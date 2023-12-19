import React from 'react';

import './style.less';
import {
   CaretRightOutlined,
   ClockCircleOutlined,
   CodeOutlined,
   SettingOutlined,
} from '@ant-design/icons';
import { Button, Popover } from 'antd';
import { iFlow } from '@hooks/flow';
import { useNavigate } from 'react-router-dom';

type NavTopChatbotProps = {
   setOpenVariable: (b: boolean) => void;
   setOpenSettings: (b: boolean) => void;
   detailFlowById: iFlow;
};

const NavTopChatbot: React.FC<NavTopChatbotProps> = (props) => {
   const { setOpenSettings, setOpenVariable } = props;
   const navigate = useNavigate();
   return (
      <div className={'nav-top-chatbot'}>
         <div className="breadcrumb">
            <span className="btn-back-create-page" onClick={() => navigate('/')}>
               Create ChatBot
            </span>
            <CaretRightOutlined className="icon" />
            <span>{props.detailFlowById.name ?? 'Chat-Bot-Name'}</span>
         </div>

         <div className="menu-right">
            <div className="tool-list">
               <Popover placement="bottom" content={<h6>List variable</h6>}>
                  <button className="tool-item" onClick={() => setOpenVariable(true)}>
                     <CodeOutlined />
                  </button>
               </Popover>
               <Popover placement="bottom" content={<h6>Versions</h6>}>
                  <button className="tool-item">
                     <ClockCircleOutlined />
                  </button>
               </Popover>

               <Popover placement="bottom" content={<h6>Settings</h6>}>
                  <button className="tool-item" onClick={() => setOpenSettings(true)}>
                     <SettingOutlined />
                  </button>
               </Popover>
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
