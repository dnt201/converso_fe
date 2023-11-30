import React from 'react';
import './style.less';
import { CheckOutlined } from '@ant-design/icons';

export interface iBenefitItem {
   title: string;
   listContent: string[];
   purpose: string;
   image: string;
}
const BenefitItem: React.FC<iBenefitItem> = (props) => {
   const { title, listContent, purpose, image } = props;
   return (
      <div className="benefit-item">
         <img src={image} />
         <h2>{title}</h2>
         <div className="list-content">
            {listContent.map((item) => {
               return (
                  <div key={item}>
                     <CheckOutlined style={{ fontSize: 10, fontWeight: 'bold', marginTop: 6 }} />

                     {item}
                  </div>
               );
            })}
         </div>
         <span className="purpose">{purpose}</span>
      </div>
   );
};

export default BenefitItem;
