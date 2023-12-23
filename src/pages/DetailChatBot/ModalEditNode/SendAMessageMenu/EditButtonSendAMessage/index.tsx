import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Input, Select, Slider, Space, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './style.less';
import { Node } from 'reactflow';
import {
   PHONE_NUMBER,
   POST_BACK,
   WEB_URL,
} from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import DetailButtonSendAMessage from './DetailsButtonSendAMessage';
import { SendAMessageData } from '@pages/DetailChatBot/CustomNode/SendAMessageNode';

type EditButtonSendAMessageProps = {
   innerNode: Node<SendAMessageData>;
   setInnerNode: (node: Node<SendAMessageData>) => void;
   listButton: Array<WEB_URL | POST_BACK | PHONE_NUMBER>;
   setListButton: (buttons: Array<WEB_URL | POST_BACK | PHONE_NUMBER>) => void;
};

const EditButtonSendAMessage: React.FC<EditButtonSendAMessageProps> = (props) => {
   const { innerNode, setInnerNode, listButton, setListButton } = props;

   return (
      <div className="edit-button-send-a-message">
         <div className="add-actions">
            <div className="list-button">
               {listButton.length <= 0 ? (
                  <Empty description="No button" />
               ) : (
                  listButton.map((item, i) => {
                     return (
                        <DetailButtonSendAMessage
                           indexButton={i}
                           listButton={listButton}
                           setListButton={(b) => setListButton(b)}
                           button={item}
                           key={i}
                        />
                     );
                  })
               )}
            </div>
            <Button
               onClick={() => {
                  if (listButton.length > 2) {
                     notification.info({ message: 'Max is 3 buttons response!' });
                  } else {
                     setListButton(
                        listButton.concat({
                           type: 'web_url',
                           title: '',
                           url: '',
                        })
                     );
                  }
               }}>
               <PlusOutlined />
               Add
            </Button>
         </div>
      </div>
   );
};

export default EditButtonSendAMessage;
