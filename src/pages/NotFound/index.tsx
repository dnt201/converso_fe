import { NotFoundIcon } from '@assets/icons';
import './style.less';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
   const navigate = useNavigate();
   return (
      <div className="not-found-container">
         <NotFoundIcon height={300} width={300} />
         <div className="note">
            <b>Maybe you got lost</b>
            <span>Click button to go home page</span>
         </div>
         <Button
            type="primary"
            onClick={() => {
               navigate('/');
            }}>
            Go Home
         </Button>
      </div>
   );
};

export default NotFound;
