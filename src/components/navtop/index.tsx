import { Button, Dropdown, MenuProps, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { DownOutlined } from '@ant-design/icons';
import { ChatBotLogo, Messenger, Shopify, Wordpress, Zalo } from '@assets/icons';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.less';

const items: MenuProps['items'] = [
   {
      label: (
         <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
         </a>
      ),
      key: '0',
   },
   {
      label: (
         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item
         </a>
      ),
      key: '1',
   },
   {
      type: 'divider',
   },
   {
      label: '3rd menu item（disabled）',
      key: '3',
   },
];
const items2: MenuProps['items'] = [
   {
      label: (
         <a
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
            className="drop-down-item-selection">
            <Messenger />
            Messenger
         </a>
      ),
      key: '0',
   },
   {
      label: (
         <a
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
            className="drop-down-item-selection">
            <Zalo width={24} />
            Zalo
         </a>
      ),
      key: '1',
   },
   {
      label: (
         <a
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
            className="drop-down-item-selection">
            <Wordpress width={24} />
            WordPress
         </a>
      ),
      key: '2',
   },
   {
      label: (
         <a
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
            className="drop-down-item-selection">
            <Shopify width={24} />
            Shopify
         </a>
      ),
      key: '3',
   },
   {
      type: 'divider',
   },
   {
      label: <span className="drop-down-item-selection">See all integrations</span>,
      key: '4',
   },
];
const Navtop = () => {
   const navTopRef = useRef<HTMLDivElement>(null);
   const navigate = useNavigate();
   useEffect(() => {
      let prevScrollPos = window.scrollY;
      function handleScroll() {
         const currentYOffset = window.scrollY;
         if (navTopRef.current && currentYOffset > 64) {
            if (prevScrollPos > currentYOffset) {
               navTopRef.current.style.top = '0';
            } else {
               navTopRef.current.style.top = '-64px';
            }
            prevScrollPos = currentYOffset;
         }
      }
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <Header className="navTop" id="navTop" ref={navTopRef}>
         <button className="logo" onClick={() => navigate('/')}>
            <ChatBotLogo />
         </button>
         {/* <Menu mode="horizontal" items={items1} /> */}
         <div className="navList">
            <Dropdown menu={{ items }} overlayClassName="navTop-dropdown-custom">
               <a onClick={(e) => e.preventDefault()}>
                  <Space size={4}>
                     Product
                     <DownOutlined style={{ fontSize: '12px', translate: '0 -1px' }} />
                  </Space>
               </a>
            </Dropdown>
            <span>Pricing</span>
            <Dropdown menu={{ items: items2 }} overlayClassName="navTop-dropdown-custom">
               <a onClick={(e) => e.preventDefault()}>
                  <Space size={4}>
                     Integrations
                     <DownOutlined style={{ fontSize: '12px', translate: '0 -1px' }} />
                  </Space>
               </a>
            </Dropdown>
            <Dropdown menu={{ items }} overlayClassName="navTop-dropdown-custom">
               <a onClick={(e) => e.preventDefault()}>
                  <Space size={4}>
                     Resources
                     <DownOutlined style={{ fontSize: '12px', translate: '0 -1px' }} />
                  </Space>
               </a>
            </Dropdown>
         </div>
         <div className="authBtn">
            <Button type="default" onClick={() => navigate('auth?action=login')}>
               Login
            </Button>
            <Button type="primary" onClick={() => navigate('auth?action=register')}>
               Sign up free
            </Button>
         </div>
      </Header>
   );
};

export default Navtop;
