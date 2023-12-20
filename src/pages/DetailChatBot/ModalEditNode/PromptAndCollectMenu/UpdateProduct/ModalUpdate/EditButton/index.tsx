import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Slider, Space, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './style.less';
import { Node } from 'reactflow';
import {
   PHONE_NUMBER,
   POST_BACK,
   PromptCollectData,
   WEB_URL,
} from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import DetailButton from './DetailsButton';

type EditButtonsProps = {
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
   index: number;
   listButton: Array<WEB_URL | POST_BACK | PHONE_NUMBER>;
   setListButton: (buttons: Array<WEB_URL | POST_BACK | PHONE_NUMBER>) => void;
};

const EditButtons: React.FC<EditButtonsProps> = (props) => {
   const { innerNode, index, setInnerNode, listButton, setListButton } = props;

   // const [listButton, setListButton] = useState(innerNode.data.extend[index]?.buttons ?? []);
   // const listButton = innerNode.data.extend[index].buttons ?? [];
   // useEffect(() => {
   //    setInnerNode({
   //       ...innerNode,
   //       data: {
   //          ...innerNode.data,
   //          extend: innerNode.data.extend.map((ext, i) => {
   //             if (i === index) {
   //                return {
   //                   ...ext,
   //                   buttons: listButton,
   //                };
   //             }
   //             return ext;
   //          }),
   //       },
   //    });
   // }, [listButton]);
   return (
      <div className="edit-button">
         <div className="add-actions">
            <Divider orientation="left">
               <h5>Action Buttons</h5>
            </Divider>

            <div className="list-button">
               {listButton.map((item, i) => {
                  return (
                     <DetailButton
                        indexButton={i}
                        indexProduct={index}
                        listButton={listButton}
                        setListButton={(b) => setListButton(b)}
                        button={item}
                        key={i}
                     />
                  );
               })}
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

export default EditButtons;
