import React, { useEffect } from 'react';
// import tw from 'tailwind-styled-components';

// const Container = tw.div`grow border border-b-1 flex flex-col p-3 overflow-y-auto gap-3`;
// const Message = tw.div`p-3 bg-gray-100 rounded-2xl w-fit`;
import './style.less';
export interface MessageItem {
   id: string;
   isOther: boolean;
   message: string;
}

interface BodyProps {
   messages: MessageItem[];
}

const Body: React.FC<BodyProps> = ({ messages }) => {
   useEffect(() => {
      var messagesContainer = document.getElementById('messages-container'); // Updated ID here
      if (messagesContainer) {
         messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
   }, [messages]);

   return (
      <div id="messages-container" className="test-bot-body">
         {messages.map((e, i) => {
            return (
               <div key={e.id} className={' message ' + (e.isOther ? '' : 'self-end')}>
                  <div className={e.isOther ? '' : ' isOther'}>{e.message}</div>
               </div>
            );
         })}
      </div>
   );
};

export default Body;
