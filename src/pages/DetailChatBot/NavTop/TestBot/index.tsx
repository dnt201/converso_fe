import React, { useEffect, useState } from 'react';
import Header from './Header';
import Body, { MessageItem } from './Body';
import SendArea from './SendArea';
import { getCurrentUser } from '@utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import './style.less';

const userId = localStorage.getItem('userId') || uuidv4();

if (!localStorage.getItem('userId')) {
   localStorage.setItem('userId', userId);
}

export const socket = io('https://converso.site', {
   withCredentials: true,
   extraHeaders: {
      'my-custom-header': 'abcd',
   },
   query: {
      userId: userId,
      channelId: localStorage.getItem('curChanelId'),
   },
});
const TestBot: React.FC<{ closeWindow: () => void }> = (props) => {
   const { closeWindow } = props;
   let storedMessages = localStorage.getItem('storedMessages');

   let parseStoredMessages: MessageItem[] = [];
   try {
      parseStoredMessages = JSON.parse(storedMessages) as MessageItem[];
   } catch (e) {
      console.log('Cant not get messages from localStorage', e);
   }

   const [messages, setMessages] = useState<MessageItem[]>(parseStoredMessages || []);

   const addMessage = (message, isBot) => {
      setMessages((prev) => {
         const newMessages = [...prev, { message: message, id: uuidv4(), isOther: isBot }];

         localStorage.setItem('storedMessages', JSON.stringify(newMessages));

         return newMessages;
      });
   };

   useEffect(() => {
      // Listen for incoming messages
      socket.on('message', (data) => {
         addMessage(data.message, true);
      });

      socket.on('received', (data) => {
         addMessage(data.message, false);
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   return (
      <div className="test-bot-container">
         <Header closeWindow={() => closeWindow()} />
         <Body messages={messages} />
         <SendArea />
      </div>
   );
};

export default TestBot;
