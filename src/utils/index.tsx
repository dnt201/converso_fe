import { CustomerServiceOutlined } from '@ant-design/icons';
import { iOption } from '@interfaces/index';
import { Space } from 'antd';
import { ReactNode } from 'react';

export const findOptionByValue = (value: string, options: iOption[]): iOption | undefined => {
   return options.find((item) => item.value === value) ?? undefined;
};

export const getTypeNode = (type: string | undefined): ReactNode => {
   switch (type) {
      case 'promptandcollect':
         // code block
         return (
            <Space className="lazy" style={{ fontSize: 18, color: 'var(--color-disable)' }}>
               <CustomerServiceOutlined />
               <span>Prompt And Collect</span>
            </Space>
         );
         break;
      case 'y':
         // code block
         break;
      default:
         // code block
         return (
            <>
               <span>undefined type</span>
            </>
         );
   }
};
