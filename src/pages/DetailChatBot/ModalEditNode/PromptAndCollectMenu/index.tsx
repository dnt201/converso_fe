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
type tSubMenu = 'main' | 'no-match' | 'repeat';
import './style.less';
import AppearLayout from '@layouts/AppearLayout';
import UpdateProduct from './UpdateProduct';
import { atom, useAtom } from 'jotai';
import { languagesAtom, listIntentAtom } from '@pages/DetailChatBot';
import ListUpdate from './ListUpdate';
import { listVariableAtom } from '@pages/DetailChatBot/VariablesModal';
import { Option } from 'antd/es/mentions';
import ListUpdateNotMatch from './ListUpdateNotMatch';

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

   const [curSubMenu, setCurSubMenu] = useState<tSubMenu>('main');
   const [languages, setLanguages] = useAtom(languagesAtom);
   const [listIntent] = useAtom(listIntentAtom);

   const [listVariable] = useAtom(listVariableAtom);
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
                  <>
                     <AppearLayout>
                        <div className="tab-menu">
                           <span
                              className={'tab-item' + (curSubMenu === 'main' ? ' active' : '')}
                              onClick={() => setCurSubMenu('main')}>
                              Main
                           </span>
                           <span
                              className={'tab-item' + (curSubMenu === 'no-match' ? ' active' : '')}
                              onClick={() => setCurSubMenu('no-match')}>
                              No Match
                           </span>
                           <span
                              className={'tab-item' + (curSubMenu === 'repeat' ? ' active' : '')}
                              onClick={() => setCurSubMenu('repeat')}>
                              Repeat
                           </span>
                        </div>
                        {curSubMenu === 'main' ? (
                           <>
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
                                                onClick={() =>
                                                   (refListProduct.current.scrollLeft -= 200)
                                                }>
                                                <ArrowLeftOutlined />
                                             </i>
                                             <i
                                                className="right-btn"
                                                onClick={() =>
                                                   (refListProduct.current.scrollLeft += 200)
                                                }>
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
                                 <AppearLayout>
                                    <Divider orientation="left">
                                       <h5>Ask user address</h5>
                                    </Divider>
                                    {languages.map((item) => {
                                       return (
                                          <ListUpdate
                                             innerNode={innerNode}
                                             setInnerNode={setInnerNode}
                                             item={item}
                                             key={item.label + item.value}
                                          />
                                       );
                                    })}
                                 </AppearLayout>
                              ) : innerNode.data.prompt_type === 'normal' ? (
                                 <AppearLayout>
                                    <Divider orientation="left">
                                       <h5>List main prompt</h5>
                                    </Divider>
                                    {languages.map((item) => {
                                       return (
                                          <ListUpdate
                                             innerNode={innerNode}
                                             setInnerNode={setInnerNode}
                                             item={item}
                                             key={item.label + item.value}
                                          />
                                       );
                                    })}
                                 </AppearLayout>
                              ) : null}
                           </>
                        ) : curSubMenu === 'repeat' ? (
                           <AppearLayout>
                              <Divider orientation="left">
                                 <h5>Repeat times</h5>
                              </Divider>
                              <Select
                                 options={listRepeat}
                                 defaultValue={innerNode.data.repeat}
                                 style={{ width: '100%' }}
                                 placeholder="Select repeat times"
                                 onSelect={(v) => {
                                    setInnerNode({
                                       ...innerNode,
                                       data: { ...innerNode.data, repeat: v },
                                    });
                                 }}
                              />
                           </AppearLayout>
                        ) : curSubMenu === 'no-match' ? (
                           <>
                              <AppearLayout>
                                 <Divider orientation="left">
                                    <h5>List main prompt when not match</h5>
                                 </Divider>
                                 {languages.map((item) => {
                                    return (
                                       <ListUpdateNotMatch
                                          innerNode={innerNode}
                                          setInnerNode={setInnerNode}
                                          item={item}
                                          key={item.label + item.value}
                                       />
                                    );
                                 })}
                              </AppearLayout>
                           </>
                        ) : null}
                     </AppearLayout>
                  </>
               ) : keyTab === 'grammar' ? (
                  <AppearLayout>
                     <div className="settings">
                        <Form layout="vertical">
                           <Form.Item label="Grammar type">
                              <Select
                                 options={listGrammarType}
                                 defaultValue={innerNode.data.validateType}
                                 onSelect={(_, b) => {
                                    setInnerNode((pre) => {
                                       return {
                                          ...pre,
                                          data: {
                                             ...pre.data,
                                             validateType: b.value,
                                          },
                                       };
                                    });
                                 }}
                              />
                           </Form.Item>
                           <Form.Item label="Trained data">
                              <Select
                                 defaultValue={innerNode.data.intent}
                                 onSelect={(_, b) => {
                                    setInnerNode((pre) => {
                                       return {
                                          ...pre,
                                          data: {
                                             ...pre.data,
                                             intent: b.value,
                                          },
                                       };
                                    });
                                 }}
                                 options={listIntent.map((item) => {
                                    return {
                                       value: item.referenceId,
                                       label: item.name,
                                    };
                                 })}
                                 placeholder="Select intent"
                              />
                           </Form.Item>
                           <Form.Item label="Assign User Response">
                              <Select
                                 placeholder="Assign User Response"
                                 options={listVariable.map((item) => item)}
                                 defaultValue={
                                    innerNode.data.answer.length <= 0
                                       ? undefined
                                       : innerNode.data.answer
                                 }
                                 onSelect={(_, b) => {
                                    setInnerNode((pre) => {
                                       return {
                                          ...pre,
                                          data: {
                                             ...pre.data,
                                             answer: b.label,
                                          },
                                       };
                                    });
                                 }}>
                                 {/* {listVariable.map((item) => {
                                 return (
                                    <Select.Option key={item.label} value={item.value}>
                                       {item.label}
                                    </Select.Option>
                                 );
                              })} */}
                              </Select>
                           </Form.Item>
                        </Form>
                     </div>
                  </AppearLayout>
               ) : null}
            </div>
         </div>
      </div>
   );
};

export default PromptCollectMenu;

// export const listGrammarType = atom<iAttributes[]>([]);
// "yes-no ||  ||  ||  ||  || ",
const listGrammarType = [
   { value: 'none', label: 'None' },
   { value: 'yes-no', label: 'Yes or No' },
   { value: 'number', label: 'Number' },
   { value: 'email', label: 'Email' },
   { value: 'phonenumber', label: 'Phonenumber' },
   { value: 'intent', label: 'Intent' },
];
const listRepeat = [
   { value: 0, label: '0' },
   { value: 1, label: '1' },
   { value: 2, label: '2' },
   { value: 3, label: '3' },
   { value: 4, label: '4' },
   { value: 5, label: '5' },
   { value: 6, label: '6' },
   { value: 7, label: '7' },
   { value: 8, label: '8' },
   { value: 9, label: '9' },
   { value: 10, label: '10' },
];