import React, { useEffect, useState } from 'react';

import './style.less';
import {
   CaretRightOutlined,
   ClockCircleOutlined,
   CodeOutlined,
   SettingOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Popover, Tooltip } from 'antd';
import { iFlow } from '@hooks/flow';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { flowNameAtom, haveFlowChangeAtom, languagesAtom } from '..';
import { useEditFollow } from '@hooks/flow/editFlow';
import { tListNodeData } from '../CustomNode';
import { Edge, Node } from 'reactflow';
import { listVariableAtom } from '../VariablesModal';
import TestBot from './TestBot';
import FormItem from 'antd/es/form/FormItem';

type NavTopChatbotProps = {
   setOpenVariable: (b: boolean) => void;
   setOpenSettings: (b: boolean) => void;
   detailFlowById: iFlow;
   nodes: Node<tListNodeData>[];
   edges: Edge[];
};

const NavTopChatbot: React.FC<NavTopChatbotProps> = (props) => {
   const { setOpenSettings, setOpenVariable, detailFlowById, nodes, edges } = props;
   const [haveFlowChange, setHaveFlowChange] = useAtom(haveFlowChangeAtom);
   const [languages, setLanguages] = useAtom(languagesAtom);
   const [variables, setVariables] = useAtom(listVariableAtom);
   const [flowName, setFlowName] = useAtom(flowNameAtom);
   const [openTestBot, setOpenTestBot] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      localStorage.setItem('curChanelId', props.detailFlowById.id);
   }, []);

   const editFlow = useEditFollow();
   return (
      <div className={'nav-top-chatbot'}>
         {/* {openTestBot ? <TestBot closeWindow={() => setOpenTestBot(false)} /> : null} */}
         <div className="breadcrumb">
            <span
               className="btn-back-create-page"
               onClick={() => navigate('/manage-flow', { replace: true })}>
               Create Flow
            </span>
            <CaretRightOutlined className="icon" />

            <Input
               style={{ width: 200 }}
               placeholder="Enter your flow name"
               defaultValue={detailFlowById.name}
               onChange={(e) => setFlowName(e.target.value)}
            />
         </div>

         <div className="menu-right">
            <div className="tool-list">
               <Popover placement="bottom" content={<h6>List variable</h6>}>
                  <button className="tool-item" onClick={() => setOpenVariable(true)}>
                     <CodeOutlined />
                  </button>
               </Popover>
               {/* <Popover placement="bottom" content={<h6>Versions</h6>}>
                  <button className="tool-item">
                     <ClockCircleOutlined />
                  </button>
               </Popover> */}

               <Popover placement="bottom" content={<h6>Settings</h6>}>
                  <button className="tool-item" onClick={() => setOpenSettings(true)}>
                     <SettingOutlined />
                  </button>
               </Popover>
            </div>
            <div className="action-list">
               {/* <Button className="action-item --test-your-bot" onClick={() => setOpenTestBot(true)}>
                  Test your bot
               </Button> */}
               {!flowName ? (
                  <Tooltip title="Flow name is empty">
                     <Button
                        className="action-item"
                        type="primary"
                        disabled={true}
                        onClick={() => {
                           //update flow api)
                           // console.log(JSON.stringify(nodes));
                           editFlow.mutate({
                              ...detailFlowById,
                              diagram: nodes,
                              edges: props.edges,
                              settings: languages,
                              attributes: variables,
                           });
                           setHaveFlowChange(false);
                        }}>
                        Save
                     </Button>
                  </Tooltip>
               ) : (
                  <Button
                     className="action-item"
                     type="primary"
                     disabled={!haveFlowChange && flowName === detailFlowById.name}
                     onClick={() => {
                        //update flow api)
                        // console.log(JSON.stringify(nodes));
                        editFlow.mutate({
                           ...detailFlowById,
                           diagram: nodes,
                           edges: props.edges,
                           settings: languages,
                           attributes: variables,
                           name: flowName,
                        });
                        setHaveFlowChange(false);
                     }}>
                     Save
                  </Button>
               )}
            </div>
         </div>
      </div>
   );
};

export default NavTopChatbot;
