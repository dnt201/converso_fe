import React from 'react';
import './style.less';
import { MinusOutlined } from '@ant-design/icons';
interface HeaderProps {
   closeWindow: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
   const toggleChatBox = () => {
      if (window.parent) {
         window.parent.postMessage(
            {
               type: 'TOGGLE_CHAT',
            },
            '*'
         );
      }
   };

   return (
      <div className="test-bot-header-container">
         <span>Converso bot</span>
         <div onClick={() => props.closeWindow()}>
            {/* <i className="fa-solid fa-minus" /> */}
            <MinusOutlined />
         </div>
      </div>
   );
};

export default Header;
