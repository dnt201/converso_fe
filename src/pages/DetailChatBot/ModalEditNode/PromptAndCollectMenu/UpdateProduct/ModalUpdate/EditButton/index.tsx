import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Slider, Space, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './style.less';
import { Node } from 'reactflow';
import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import DetailButton from './DetailsButton';

type EditButtonsProps = {
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
   index: number;
};

const EditButtons: React.FC<EditButtonsProps> = (props) => {
   const { innerNode, index, setInnerNode } = props;
   // const [listButton, setListButton] = useState(innerNode.data.extend[index]?.buttons ?? []);
   const listButton = innerNode.data.extend[index].buttons ?? [];
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
               {innerNode.data.extend[index].buttons.map((item, i) => {
                  return (
                     <DetailButton
                        indexButton={i}
                        indexProduct={index}
                        innerNode={innerNode}
                        setInnerNode={(e) => setInnerNode(e)}
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
                     setInnerNode({
                        ...innerNode,
                        data: {
                           ...innerNode.data,
                           extend: innerNode.data.extend.map((item, i) => {
                              if (i === index) {
                                 return {
                                    ...item,
                                    buttons: item.buttons.concat({
                                       type: 'web_url',
                                       title: '',
                                       url: '',
                                    }),
                                 };
                              }
                              return item;
                           }),
                        },
                     });
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
