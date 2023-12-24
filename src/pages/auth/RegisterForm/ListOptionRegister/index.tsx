import { notification } from 'antd';
import './style.less';
const ListOptionRegister = () => {
   return (
      <div className="list-option-register">
         <div
            className="register-option"
            onClick={() => {
               notification.info({ message: 'This feature is coming soon!' });
            }}>
            <div className="logo-google" />
            <span>
               Sign up with <b>Google</b>
            </span>
         </div>
         <div
            className="register-option"
            onClick={() => {
               notification.info({ message: 'This feature is coming soon!' });
            }}>
            <div className="logo-microsoft" />
            <span>
               Sign up with <b>Microsoft</b>
            </span>
         </div>
         <div
            className="register-option"
            onClick={() => {
               notification.info({ message: 'This feature is coming soon!' });
            }}>
            <div className="logo-apple" />
            <span>
               Sign up with <b>Apple</b>
            </span>
         </div>
         <div
            className="register-option"
            onClick={() => {
               notification.info({ message: 'This feature is coming soon!' });
            }}>
            <div className="logo-facebook" />
            <span>
               Sign up with <b>Facebook</b>
            </span>
         </div>
      </div>
   );
};

export default ListOptionRegister;
