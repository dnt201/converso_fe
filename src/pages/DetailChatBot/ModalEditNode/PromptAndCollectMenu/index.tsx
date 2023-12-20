import {
   ArrowLeftOutlined,
   ArrowRightOutlined,
   CheckOutlined,
   CloseOutlined,
   EditOutlined,
   FileImageFilled,
   MenuUnfoldOutlined,
   MessageOutlined,
   QuestionCircleFilled,
} from '@ant-design/icons';
import {
   PROMPT_COLLECT_TYPE,
   PromptCollectData,
} from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Button, Divider, Empty, Form, Input, Select, Space, Tooltip, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Node } from 'reactflow';

type tKeyTab = 'general' | 'settings' | 'grammar';
import './style.less';
import AppearLayout from '@layouts/AppearLayout';
import UpdateProduct from './UpdateProduct';
import { useAtom } from 'jotai';
import { languagesAtom } from '@pages/DetailChatBot';
import ListUpdate from './ListUpdate';
import { listVariableAtom } from '@pages/DetailChatBot/VariablesModal';

interface PromptCollectMenuProps {
   promptCollect: Node<PromptCollectData>;
   closeModal: () => void;
   setNode: (curNode: Node | null) => void;
}
// 'address_template' | 'template' | 'normal';
const list_type_selection = [
   { value: 'normal', label: 'Text' },
   { value: 'address_template', label: 'Address template' },
   { value: 'template', label: 'Product template' },
];
const PromptCollectMenu: React.FC<PromptCollectMenuProps> = (props) => {
   const { closeModal, promptCollect, setNode } = props;
   const [innerNode, setInnerNode] = useState<Node<PromptCollectData>>(promptCollect);
   const [keyTab, setKeyTab] = useState<tKeyTab>('general');
   const [languages, setLanguages] = useAtom(languagesAtom);
   const [listVariable, setListVariable] = useAtom(listVariableAtom);

   useEffect(() => {
      setNode(innerNode);
   }, [innerNode]);

   const addProduct = () => {
      if (innerNode.data.extend.length <= 9) {
         setInnerNode({
            ...innerNode,
            data: {
               ...innerNode.data,
               extend: [
                  ...innerNode.data.extend,
                  {
                     title: '',
                     subtitle: '',
                     image_url: '',
                     buttons: [],
                     default_action: {
                        url: 'https://converso.site',
                        type: 'web_url',
                        webview_height_ratio: 'tall',
                     },
                  },
               ],
            },
         });
      } else notification.info({ message: 'Response with item has max 10 item!' });
   };
   const refListProduct = useRef<HTMLDivElement>();

   const changeType = (type: PROMPT_COLLECT_TYPE) => {
      setInnerNode({
         ...innerNode,
         data: { ...innerNode.data, prompt_type: type },
      });
   };
   return (
      <div className="edit-mode-prompt-and-collect" onClick={(e) => e.preventDefault()}>
         <div className="node-header">
            <div className="top">
               <Space style={{ fontSize: 18, color: 'var(--color-main-blue)' }} align="center">
                  <QuestionCircleFilled style={{ fontSize: 24 }} />
                  <span>Prompt And Collect</span>
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
                  defaultValue={promptCollect.data.name}
               />
            </div>
            <div className="node-information">
               <b>Type:</b>
               <Select
                  className="select-type"
                  defaultValue={promptCollect.data.prompt_type}
                  options={list_type_selection}
                  onSelect={(e) => changeType(e)}
               />
            </div>
         </div>

         <div className="content">
            <div className="response">
               <div className="step-menu">
                  <div className="header">
                     Edit node <EditOutlined />
                  </div>
                  <div>
                     <div
                        className={'item ' + (keyTab === 'general' ? ' selected' : '')}
                        onClick={() => setKeyTab('general')}>
                        <i className="icon">
                           <MenuUnfoldOutlined />
                        </i>
                        <span className="text">General</span>
                     </div>
                     {keyTab === 'general' && innerNode.data.prompt_type === 'template' ? (
                        <div className="list-element">
                           <Tooltip title={'Click to add response with product'}>
                              <div className="product-element" onClick={() => addProduct()}>
                                 <div className="image">
                                    <i>
                                       <FileImageFilled />
                                    </i>
                                 </div>
                                 <div className="information" />
                                 <div className="information" />
                                 <div className="information" />
                                 <div className="btn" />
                              </div>
                           </Tooltip>
                        </div>
                     ) : null}
                  </div>

                  <div
                     className={'item ' + (keyTab === 'grammar' ? ' selected' : '')}
                     onClick={() => setKeyTab('grammar')}>
                     <i className="icon">
                        <CheckOutlined />
                     </i>
                     <span className="text">Grammar</span>
                  </div>
               </div>
               {keyTab === 'general' ? (
                  <AppearLayout>
                     {innerNode.data.prompt_type === 'template' ? (
                        <AppearLayout>
                           <Divider orientation="left">
                              <h5>List response</h5>
                           </Divider>
                           <div className="list-product-container">
                              {innerNode.data.extend.length &&
                              refListProduct.current &&
                              refListProduct.current.scrollWidth >
                                 refListProduct.current.clientWidth ? (
                                 <>
                                    <i
                                       className="left-btn"
                                       onClick={() => (refListProduct.current.scrollLeft -= 200)}>
                                       <ArrowLeftOutlined />
                                    </i>
                                    <i
                                       className="right-btn"
                                       onClick={() => (refListProduct.current.scrollLeft += 200)}>
                                       <ArrowRightOutlined />
                                    </i>
                                 </>
                              ) : null}

                              <div className="list-product" ref={refListProduct}>
                                 {innerNode.data.extend.length <= 0 ? (
                                    <Empty
                                       description="Click button in left menu to add response!"
                                       style={{ width: '100%' }}
                                    />
                                 ) : (
                                    innerNode.data.extend.map((item, index) => {
                                       return (
                                          <UpdateProduct
                                             index={index}
                                             {...item}
                                             key={crypto.randomUUID()}
                                             innerNode={innerNode}
                                             // item={item}
                                             setInnerNode={(n) => setInnerNode(n)}
                                             // key={item.key}
                                          />
                                       );
                                    })
                                 )}
                              </div>
                           </div>
                        </AppearLayout>
                     ) : innerNode.data.prompt_type === 'address_template' ? (
                        <>Address</>
                     ) : innerNode.data.prompt_type === 'normal' ? (
                        languages.map((item) => {
                           return (
                              <ListUpdate
                                 innerNode={innerNode}
                                 setInnerNode={setInnerNode}
                                 item={item}
                                 key={item.label + item.value}
                              />
                           );
                        })
                     ) : null}
                  </AppearLayout>
               ) : keyTab === 'settings' ? (
                  <></>
               ) : (
                  <AppearLayout>
                     <div className="settings">
                        <Form layout="vertical">
                           <Form.Item label="Grammar type">
                              <Select />
                           </Form.Item>
                           <Form.Item label="Grammar">
                              <Select />
                           </Form.Item>
                           <Form.Item label="Assign Chatbot Response">
                              <Select
                                 options={listVariable.map((item) => item)}
                                 defaultValue={innerNode.data.answer}
                                 onSelect={(v) => {
                                    setInnerNode((pre) => {
                                       return {
                                          ...pre,
                                          data: { ...pre.data, answer: v },
                                       };
                                    });
                                 }}
                              />
                           </Form.Item>
                           <Form.Item label="Assign Intent">
                              <Select />
                           </Form.Item>
                        </Form>
                     </div>
                  </AppearLayout>
               )}
            </div>
         </div>
      </div>
   );
};

export default PromptCollectMenu;
