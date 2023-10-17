import './style.less';
import { ChatBotLogo } from '@assets/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import FormLogin from './FormLogin';
import ListOptionLogin from './ListOptionLogin';
const Login = () => {
   const navigate = useNavigate();
   return (
      <div className="login-container">
         <div className="left-element">
            <span className="title">
               Log in to all your
               <b>{' text| '}</b>
               products
            </span>
            <div className="list-element">
               <div>
                  <div className="live-chat" />
                  <span>Connect with customers</span>
               </div>
               <div>
                  <div className="chat-bot" />
                  <span>Automate customer service with AI</span>
               </div>
               <div>
                  <div className="help-desk" />
                  <span>Support customers with tickets</span>
               </div>
               <div>
                  <div className="knowledge-base" />
                  <span>Improve support with customer self-service</span>
               </div>
            </div>
            <div className="footer">
               <div className="logo-container">
                  <div className="logo" />
               </div>
               <p>
                  ChatBot is an all-in-one platform that automates customer service by using
                  conversational AI. <span className="learn-more">Learn more</span>
               </p>
            </div>
         </div>
         <div className="right-element">
            <div className="logo" onClick={() => navigate('/')}>
               <ChatBotLogo />
            </div>
            <span className="title">Log in</span>
            <FormLogin />
            <span className="sign-up">
               Need new account? <Link to="/register">Sign up free</Link>
            </span>
            <Divider className="divider">or</Divider>
            <ListOptionLogin />
         </div>
      </div>
   );
};

export default Login;
