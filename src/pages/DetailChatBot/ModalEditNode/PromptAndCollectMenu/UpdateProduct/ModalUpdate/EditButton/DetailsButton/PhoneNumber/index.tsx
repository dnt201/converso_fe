import React from 'react';
import {
   PHONE_NUMBER,
   POST_BACK,
   WEB_URL,
} from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Col, Input, Row } from 'antd';

interface PhoneNumberProps {
   button: PHONE_NUMBER;
   listButton: Array<WEB_URL | POST_BACK | PHONE_NUMBER>;
   setListButton: (buttons: Array<WEB_URL | POST_BACK | PHONE_NUMBER>) => void;
   indexButton: number;
}

const PhoneNumber: React.FC<PhoneNumberProps> = (props) => {
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
               placeholder="Phone number"
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

export default PhoneNumber;
