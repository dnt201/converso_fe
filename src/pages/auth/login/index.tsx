import './style.less';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input } from 'antd';
import ListOptionLogin from './ListOptionLogin';

const Login: React.FC<{}> = () => {
   return (
      <>
         <Form
            layout={'vertical'}
            //  wrapperCol={{ span: 4 }}
            style={{ minWidth: 360, marginTop: '16px' }}>
            <Form.Item<string>
               label="Business Email"
               name="email"
               rules={[{ required: true, message: 'Please input your email!' }]}>
               <Input placeholder="your-business@work-gmail.com" />
            </Form.Item>
            <Form.Item<string>
               label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                     <span style={{ flex: '1' }}>Password</span>
                     <span
                        className="forgot-password"
                        onClick={(e) => {
                           e.preventDefault();
                           prompt('Forgot-password');
                        }}>
                        Forgot password?
                     </span>
                  </div>
               }
               name="password"
               className="special"
               rules={[{ required: true, message: 'Please input your password!' }]}>
               <Input.Password placeholder="your-password" />
            </Form.Item>
            <Form.Item className="btn">
               <Button
                  style={{ width: '100%', marginBottom: '0px' }}
                  type="primary"
                  htmlType="submit">
                  Log in
               </Button>
            </Form.Item>
         </Form>
         <Divider className="divider">or</Divider>
         <ListOptionLogin />
      </>
   );
};

export default Login;
