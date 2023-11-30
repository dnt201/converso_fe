import { Button, Modal, ModalProps, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.less';
import { useAtom } from 'jotai';
import { iLanguageOption, languagesAtom, listLanguageSystem } from '..';
import { tLanguage } from '../CustomNode';
import {
   CheckCircleFilled,
   DeleteOutlined,
   EditOutlined,
   PlusOutlined,
} from '@ant-design/icons';

interface SettingsModalProps extends ModalProps {
   setShowModal: (b: boolean) => void;
}
type SettingState = 'language';
type ListMenu = {
   label: string;
   value: SettingState;
}[];
const listMenu: ListMenu = [{ label: 'Language settings', value: 'language' }];
const SettingsModal: React.FC<SettingsModalProps> = (props) => {
   const { setShowModal, ...propsModal } = props;
   const [curSettings, setCurSettings] = useState<SettingState>('language');
   const [curLanguage, setCurLanguage] = useState<iLanguageOption>();

   const [languages, setLanguages] = useAtom(languagesAtom);
   const [listExistLanguage, setListExistLanguage] = useState<iLanguageOption[]>([]);
   useEffect(() => {
      const tempOption: { value: tLanguage; label: string }[] = listLanguageSystem.filter(
         (langSystem) => !languages.some((langSelect) => langSelect.value === langSystem.value)
      );
      console.log(tempOption);
      setListExistLanguage(tempOption);
   }, [languages]);

   const filterOption = (input: string, option?: { label: string; value: string }) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

   return (
      <Modal
         {...propsModal}
         style={{ minWidth: '60vw' }}
         className="settings-modal"
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
                              placeholder="Select a language"
                              onSelect={(_, e2: iLanguageOption) => {
                                 setCurLanguage(e2);
                              }}
                           />
                           <Button
                              type="dashed"
                              disabled={!curLanguage}
                              onClick={() => {
                                 if (curLanguage) {
                                    const temp = { ...curLanguage, default: false };
                                    console.log(temp);
                                    setLanguages([...languages, temp]);
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
                                    <i className="check">
                                       <CheckCircleFilled />
                                    </i>

                                    <i className="edit">
                                       <EditOutlined />
                                    </i>
                                    <i className="delete">
                                       <DeleteOutlined />
                                    </i>
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
