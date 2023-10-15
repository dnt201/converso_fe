import React from 'react';

interface iElementFeature {
   img: string;
   content: string;
}
const ElementFeature: React.FC<iElementFeature> = (props) => {
   const { img, content } = props;
   return (
      <div>
         <img src={img} />
         <span>{content}</span>
      </div>
   );
};

export default ElementFeature;
