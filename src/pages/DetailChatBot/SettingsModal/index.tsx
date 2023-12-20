import { Button, Modal, ModalProps, Popconfirm, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.less';
import { useAtom } from 'jotai';
import { haveFlowChangeAtom, iLanguageOption, languagesAtom, listLanguageSystem } from '..';
import { tLanguage, tListNodeData } from '../CustomNode';
import { CheckCircleFilled, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Node } from 'reactflow';
import { PromptCollectData } from '../CustomNode/PromptCollectNode';

interface SettingsModalProps extends ModalProps {
   setShowModal: (b: boolean) => void;
   nodes: Node<tListNodeData>[];
   setNodes: (curNodes: Node[]) => void;
}
type SettingState = 'language';
type ListMenu = {
   label: string;
   value: SettingState;
}[];
const listMenu: ListMenu = [{ label: 'Language settings', value: 'language' }];
const SettingsModal: React.FC<SettingsModalProps> = (props) => {
   const { setShowModal, nodes, setNodes, ...propsModal } = props;
   const [curSettings, setCurSettings] = useState<SettingState>('language');
   const [curLanguage, setCurLanguage] = useState<iLanguageOption>();
   const [haveFlowChange, setHaveFlowChange] = useAtom(haveFlowChangeAtom);

   const [languages, setLanguages] = useAtom(languagesAtom);
   const [listExistLanguage, setListExistLanguage] = useState<iLanguageOption[]>([]);
   useEffect(() => {
      const tempOption: { value: tLanguage; label: string }[] = listLanguageSystem.filter(
         (langSystem) => !languages.some((langSelect) => langSelect.value === langSystem.value)
      );
      setListExistLanguage(tempOption);
      setHaveFlowChange(true);
   }, [languages]);

   return (
      <Modal
         {...propsModal}
         style={{ minWidth: '60vw' }}
         className="settings-modal"
         onOk={() => setShowModal(false)}
         onCancel={() => setShowModal(false)}>
         <div className="container">
            <div className="menu">
               {listMenu.map((item) => {
                  return (
                     <span
                        key={item.label}
                        className={'item ' + (item.value === curSettings ? 'active' : '')}>
                        {item.label}
                     </span>
                  );
               })}
            </div>
            <div className="content">
               {curSettings === 'language' ? (
                  <>
                     <div className="select-language">
                        <span>Select language</span>
                        <Space direction="horizontal" className="space">
                           <Select
                              style={{ flex: 1 }}
                              options={listExistLanguage}
                              value={curLanguage}
                              filterOption={(
                                 input: string,
                                 option?: { label: string; value: string }
                              ) =>
                                 (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                              showSearch
                              placeholder="Select a language"
                              onSelect={(_, e2: iLanguageOption) => {
                                 setCurLanguage(e2);
                              }}
                           />
                           <Button
                              type="default"
                              disabled={!curLanguage}
                              onClick={() => {
                                 if (curLanguage) {
                                    const temp = { ...curLanguage, default: false };
                                    setLanguages([...languages, temp]);
                                    setCurLanguage(undefined);
                                 }
                              }}>
                              <Space size={4}>
                                 <i>
                                    <PlusOutlined />
                                 </i>
                                 Add
                              </Space>
                           </Button>
                        </Space>
                     </div>
                     <div className="list-language">
                        <span>List chatbot language</span>
                        {languages.map((item) => {
                           return (
                              <div className="item" key={item.value}>
                                 <div className="name">
                                    <span>{item.label}</span>
                                    {item.default && <span className="default">default</span>}
                                 </div>
                                 <div className="actions">
                                    <Popconfirm
                                       title="Change this language is default?"
                                       onConfirm={() => {
                                          const tempLanguages = languages.map((p) => {
                                             if (p.value === item.value) {
                                                return { ...p, default: true };
                                             } else {
                                                return { ...p, default: false };
                                             }
                                          });
                                          setLanguages(tempLanguages);
                                       }}>
                                       <Button disabled={item.default}>
                                          <CheckCircleFilled />
                                       </Button>
                                    </Popconfirm>

                                    <Popconfirm
                                       disabled={item.default || item.value === 'en'}
                                       title="Are you sure to delete this language?"
                                       onConfirm={() => {
                                          setLanguages((pre) => {
                                             return pre.filter((c) => item.value !== c.value);
                                          });
                                          let temp = nodes.map((node) => {
                                             if (
                                                node.data.type === 'promptandcollect' ||
                                                node.data.type === 'message'
                                             ) {
                                                let tempNode = node as Node<PromptCollectData>;
                                                tempNode = {
                                                   ...tempNode,
                                                   data: {
                                                      ...tempNode.data,
                                                      text: tempNode.data.text.filter(
                                                         (tx) => tx.language !== item.value
                                                      ),
                                                   },
                                                };
                                                return tempNode;
                                             }
                                             return node;
                                          });
                                          setNodes(temp);
                                       }}>
                                       <Button
                                          className="delete"
                                          disabled={item.default || item.value === 'en'}>
                                          <DeleteOutlined />
                                       </Button>
                                    </Popconfirm>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </>
               ) : null}
            </div>
         </div>
      </Modal>
   );
};

export default SettingsModal;
