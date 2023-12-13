import { PlusOutlined } from '@ant-design/icons';
import { Button, Select, Space, notification } from 'antd';
import React, { useRef, useState } from 'react';
import './style.less';

const options = [
   { value: 'web_url', label: 'Web Url' },
   { value: 'postback', label: 'Post back' },
   { value: 'phone_number', label: 'Phone Number' },
];

type EditButtonsProps = {};

type WEB_URL = {
   type: 'web_url';
   title: string;
   url: string;
};

type POST_BACK = {
   type: 'postback';
   title: string;
   payload: string;
};

type PHONE_NUMBER = {
   type: 'phone_number';
   title: string;
   payload: string;
};

const EditButtons: React.FC<EditButtonsProps> = (props) => {
   const {} = props;
   const [listButton, setListButton] = useState<Array<WEB_URL | POST_BACK | PHONE_NUMBER>>([]);
   const [curSelect, setCurSelect] = useState<'web_url' | 'postback' | 'phone_number'>();
   return (
      <div className="edit-button">
         <div className="list-button">
            {listButton.map((item, i) => {
               if (item.type === 'web_url')
                  return <div key={crypto.randomUUID() + item + i}>web_url</div>;
               else if (item.type === 'phone_number') return <div>phone_number</div>;
               else if (item.type === 'postback') return <div>postback</div>;
            })}
         </div>
         <div className="add-actions">
            <Select
               placeholder="Add new button actions"
               options={options}
               onChange={(e) => {
                  setCurSelect(e);
               }}
            />
            <Button
               onClick={() => {
                  if (listButton.length > 2) {
                     notification.info({ message: 'Max is 3 buttons response!' });
                  } else {
                     if (curSelect === 'web_url') {
                        setListButton(listButton.concat({ type: 'web_url', title: '', url: '' }));
                     }
                  }
               }}>
               <PlusOutlined />
               Add
            </Button>
         </div>
      </div>
   );
};

export default EditButtons;
