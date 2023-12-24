import { notification } from 'antd';
import './style.less';
const ListOptionLogin = () => {
   return (
      <div className="list-option-login">
         <div
            className="login-option"
            onClick={() => {
               notification.info({ message: 'This feature is coming soon!' });
            }}>
            <div className="logo-google" />
            <span>
               Log in with <b>Google</b>
            </span>
         </div>
         <div
            className="login-option"
            onClick={() => {
               notification.info({ message: 'This feature is coming soon!' });
            }}>
            <div className="logo-microsoft" />
            <span>
               Log in with <b>Microsoft</b>
            </span>
         </div>
         <div
            className="login-option"
            onClick={() => {
               notification.info({ message: 'This feature is coming soon!' });
            }}>
            <div className="logo-apple" />
            <span>
               Log in with <b>Apple</b>
            </span>
         </div>
         <div
            className="login-option"
            onClick={() => {
               notification.info({ message: 'This feature is coming soon!' });
            }}>
            <div className="logo-facebook" />
            <span>
               Log in with <b>Facebook</b>
            </span>
         </div>
      </div>
   );
};

export default ListOptionLogin;
