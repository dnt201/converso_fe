import React from 'react';
import './style.less';
import { Button } from 'antd';
import { useNavigate, useRouteError } from 'react-router-dom';
interface CustomErrorProps {
   message?: string;
   subMessage?: string;
   svg?: React.ReactNode;
}

const CustomError: React.FC<CustomErrorProps> = (props) => {
   const { message, subMessage, svg } = props;
   // let error = useRouteError();
   let error = useRouteError();
   const navigate = useNavigate();

   return (
      <div className="custom-error">
         <span className="message">{error['message'] ?? (message || 'Some thing went wrong')}</span>
         <span className="sub-message">
            {subMessage ||
               'The content you are looking for maybe does not exist. Please try again!'}
         </span>
         <span className="svg"></span>

         <Button onClick={() => navigate('/', { replace: true })} type="primary">
            Back to homepage
         </Button>
      </div>
   );
};

export default CustomError;
