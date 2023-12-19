import { BuildFilled, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AppearLayout from '@layouts/AppearLayout';
import { HttpRequestData } from '@pages/DetailChatBot/CustomNode/HttpRequestNode';
import { Button, Col, Divider, Empty, Form, Input, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Node } from 'reactflow';

import './style.less';
import ParamsEdit from './ParamsEdit';
import HeaderEdit from './HeaderEdit';
type HttpRequestMenuProps = {
   node: Node<HttpRequestData>;
   closeModal: () => void;
   setNode: (curNode: Node | null) => void;
};
type CurTabType = 'params' | 'header' | 'body' | 'response';

const HttpRequestMenu: React.FC<HttpRequestMenuProps> = (props) => {
   const { node, closeModal, setNode } = props;
   const [innerNode, setInnerNode] = useState<Node<HttpRequestData>>(node);

   const [curTab, setCurTab] = useState<CurTabType>('params');
   useEffect(() => {
      setNode(innerNode);
   }, [innerNode]);
   return (
      <div className="edit-mode-http-request">
         <div className="node-header">
            <div className="top">
               <Space style={{ fontSize: 18, color: 'var(--color-main-blue)' }} align="center">
                  <BuildFilled style={{ fontSize: 24 }} />
                  <span>HTTP Request</span>
               </Space>
               <Button
                  className="close-btn"
                  type="text"
                  onClick={(e) => {
                     e.stopPropagation();
                     e.preventDefault();
                     closeModal();
                  }}>
                  <CloseOutlined />
               </Button>
            </div>
            <div className="node-information">
               <b>Node name: </b>
               <Input
                  className="input-edit-name"
                  placeholder="Enter your node name"
                  onChange={(e) => {
                     setInnerNode((pre) => {
                        return { ...pre, data: { ...pre.data, name: e.target.value } };
                     });
                  }}
                  onKeyDown={(e) => {
                     if (e.code === 'Enter') {
                        e.currentTarget.blur();
                     }
                  }}
                  defaultValue={node.data.name}
               />
            </div>
            <div className="node-information">
               <b>Type:</b>
               <Select
                  className="select-type"
                  options={[
                     { value: 'GET', label: 'GET' },
                     { value: 'POST', label: 'POST' },
                     { value: 'PUT', label: 'PUT' },
                  ]}
                  defaultValue={node.data.method}
                  // options={list_type_selection}
                  // onSelect={(e) => changeType(e)}
               />
            </div>
         </div>
         <div className="content">
            <Divider orientation="left">
               <div className="title">Options</div>
            </Divider>

            <div className="response">
               <AppearLayout>
                  <div className="tab-menu">
                     <span
                        className={'tab-item' + (curTab === 'params' ? ' active' : '')}
                        onClick={() => setCurTab('params')}>
                        {' '}
                        Params
                     </span>
                     <span
                        className={'tab-item' + (curTab === 'header' ? ' active' : '')}
                        onClick={() => setCurTab('header')}>
                        Headers
                     </span>
                     <span
                        className={'tab-item' + (curTab === 'body' ? ' active' : '')}
                        onClick={() => setCurTab('body')}>
                        Body
                     </span>
                     <span
                        className={'tab-item' + (curTab === 'response' ? ' active' : '')}
                        onClick={() => setCurTab('response')}>
                        Response
                     </span>
                  </div>
                  <div className="tab-body">
                     {curTab === 'params' ? (
                        <ParamsEdit innerNode={innerNode} setInnerNode={(e) => setInnerNode(e)} />
                     ) : curTab === 'header' ? (
                        <HeaderEdit innerNode={innerNode} setInnerNode={(e) => setInnerNode(e)} />
                     ) : (
                        ''
                     )}
                  </div>
               </AppearLayout>
            </div>
         </div>
      </div>
   );
};

export default HttpRequestMenu;
