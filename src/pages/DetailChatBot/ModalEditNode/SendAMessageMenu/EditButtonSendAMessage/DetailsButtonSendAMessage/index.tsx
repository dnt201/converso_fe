import {
   PHONE_NUMBER,
   POST_BACK,
   PromptCollectData,
   WEB_URL,
} from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Button, Col, Input, Popconfirm, Row, Select, Space } from 'antd';
import React from 'react';
import { Node } from 'reactflow';
import './style.less';
import WebUrl from './WebUrl';
import PhoneNumber from './PhoneNumber';
import PostBack from './PostBack';
interface DetailButtonSendAMessageProps {
   button: WEB_URL | POST_BACK | PHONE_NUMBER;
   listButton: Array<WEB_URL | POST_BACK | PHONE_NUMBER>;
   setListButton: (buttons: Array<WEB_URL | POST_BACK | PHONE_NUMBER>) => void;
   indexButton: number;
}

const options = [
   { value: 'web_url', label: 'Web Url' },
   { value: 'postback', label: 'Post back' },
   { value: 'phone_number', label: 'Phone Number' },
];

const DetailButtonSendAMessage: React.FC<DetailButtonSendAMessageProps> = (props) => {
   const { button, listButton, indexButton, setListButton } = props;

   return (
      <div className="details-button-container">
         <div className="details-button-container--header">
            <Select
               placeholder="Add new button actions"
               defaultValue={button.type}
               onChange={(e) => {
                  setListButton(
                     listButton.map((item, i) => {
                        if (i === indexButton) {
                           if (e === 'web_url') {
                              let temp = { ...item, type: 'web_url' } as WEB_URL;
                              return temp;
                           } else if (e === 'postback') {
                              let temp = { ...item, type: 'postback' } as POST_BACK;
                              return temp;
                           } else {
                              let temp = { ...item, type: 'phone_number' } as PHONE_NUMBER;
                              return temp;
                           }
                        }
                        return item;
                     })
                  );
               }}
               options={options}
            />
            <Space>
               <Popconfirm
                  title="Delete this button?"
                  onConfirm={() => {
                     setListButton(listButton.filter((item, i) => i !== indexButton));
                  }}>
                  <Button danger>Delete</Button>
               </Popconfirm>
            </Space>
         </div>
         {button.type === 'web_url' ? (
            <WebUrl
               button={button as WEB_URL}
               indexButton={indexButton}
               listButton={listButton}
               setListButton={setListButton}
            />
         ) : button.type === 'phone_number' ? (
            <PhoneNumber
               button={button as PHONE_NUMBER}
               indexButton={indexButton}
               listButton={listButton}
               setListButton={setListButton}
            />
         ) : button.type === 'postback' ? (
            <PostBack
               button={button as POST_BACK}
               indexButton={indexButton}
               listButton={listButton}
               setListButton={setListButton}
            />
         ) : null}
      </div>
   );
};

export default DetailButtonSendAMessage;
