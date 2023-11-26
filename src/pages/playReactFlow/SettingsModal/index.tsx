import { Modal, ModalProps, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.less';
import { useAtom } from 'jotai';
import { languagesAtom, listLanguageSystem } from '..';
import { tLanguage } from '../CustomNode';
import { iOption } from '@interfaces/index';

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
   const [curSelectLanguage, setCurSelectLanguage] = useState<tLanguage>();
   const [languages, setLanguages] = useAtom(languagesAtom);

   const [listExistLanguage, setListExistLanguage] = useState<iOption[]>([]);
   useEffect(() => {
      let tempOption: { value: string; label: string }[] = [];
      listLanguageSystem.forEach((item) => {
         languages.forEach((curLanguage) => {
            if (curLanguage.value !== item.value) tempOption = tempOption.concat(item);
         });
      });
      console.log(tempOption);
      setListExistLanguage(tempOption);
   }, [languages]);
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
                     <span>Select language</span>
                     <Select<tLanguage>
                        options={listExistLanguage}
                        onSelect={(e) => {
                           setCurSelectLanguage(e);
                        }}
                     />
                  </>
               ) : null}
            </div>
         </div>
      </Modal>
   );
};

export default SettingsModal;
