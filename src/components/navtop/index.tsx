import { Button, Dropdown, MenuProps, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Logo from '@assets/images/logo_min.png';
import './style.less';
import { DownOutlined } from '@ant-design/icons';
import { Messenger, Shopify, Wordpress, Zalo } from '@assets/icons';

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
const NavTop = () => {
   return (
      <Header className="navTop">
         <button className="logo">
            <img src={Logo} style={{ width: '40px', height: '40px' }} /> ChatBot
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
            <Button type="default">Login</Button>
            <Button type="primary">Sign up free</Button>
         </div>
      </Header>
   );
};

export default NavTop;
