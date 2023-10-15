import './style.less';
import { Form, Input } from 'antd';
import { ChatBotLogo } from '@assets/icons';
const Login = () => {
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
                  <h6>LiveChat</h6>
                  <span>Connect with customers</span>
               </div>
               <div>
                  <h6>Chatbot</h6>
                  <span>Automate customer service with AI</span>
               </div>
               <div>
                  <h6>HelpDesk</h6>
                  <span>Support customers with tickets</span>
               </div>
               <div>
                  <h6>KnowledgeBase</h6>
                  <span>Improve support with customer self-service</span>
               </div>
            </div>
            <div className="footer">
               <p>
                  ChatBot is an all-in-one platform that automates customer service by using
                  conversational AI <span>Learn more</span>
               </p>
            </div>
         </div>
         <div className="right-element">
            {/* <img src={logo} />
             */}

            <ChatBotLogo />
            <span>Login</span>
            <Form
               layout={'vertical'}
               //  wrapperCol={{ span: 4 }}
               style={{ minWidth: 360 }}>
               <Form.Item<string>
                  label="Business Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}>
                  <Input placeholder="your-business@work-gmail.com" />
               </Form.Item>
               <Form.Item<string>
                  label="Password"
                  name="password"
                  className="special"
                  rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input.Password placeholder="your-password" />
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};

export default Login;
