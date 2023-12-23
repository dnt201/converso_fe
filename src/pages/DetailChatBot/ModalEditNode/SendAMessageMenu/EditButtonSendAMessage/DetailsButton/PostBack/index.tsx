import {
   PHONE_NUMBER,
   POST_BACK,
   WEB_URL,
} from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Col, Input, Row } from 'antd';
import React from 'react';

interface PostBackProps {
   button: POST_BACK;
   listButton: Array<WEB_URL | POST_BACK | PHONE_NUMBER>;
   setListButton: (buttons: Array<WEB_URL | POST_BACK | PHONE_NUMBER>) => void;
   indexButton: number;
}

const PostBack: React.FC<PostBackProps> = (props) => {
   const { button, listButton, setListButton, indexButton } = props;
   return (
      <Row gutter={[8, 8]}>
         <Col span={12}>
            <Input
               defaultValue={button.title}
               placeholder="Title"
               onChange={(e) => {
                  setListButton(
                     listButton.map((item, i) => {
                        if (i === indexButton) {
                           return {
                              ...item,
                              title: e.target.value,
                           };
                        }
                        return item;
                     })
                  );
               }}
            />
         </Col>
         <Col span={12}>
            <Input
               defaultValue={button.payload}
               placeholder="Actions"
               onChange={(e) => {
                  setListButton(
                     listButton.map((item, i) => {
                        if (i === indexButton) {
                           return {
                              ...item,
                              payload: e.target.value,
                           };
                        }
                        return item;
                     })
                  );
               }}
            />
            {/* Payload */}
         </Col>
      </Row>
   );
};

export default PostBack;
