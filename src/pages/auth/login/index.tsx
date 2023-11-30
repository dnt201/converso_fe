import './style.less';

import { Button, Divider, Form, Input, notification } from 'antd';
import ListOptionLogin from './ListOptionLogin';
import { tLoginParams, useMutationLogin } from '@hooks/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { setCurrentUser } from '@utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { routerPath } from '@config/router/path';
const Login: React.FC<{}> = () => {
   const mutationLogin = useMutationLogin();
   const navigate = useNavigate();
   const formLoginSubmit = (formValue: tLoginParams) => {
      mutationLogin.mutate(formValue, {
         onSuccess: (value) => {
            setCurrentUser(value.data);
            navigate(routerPath.DASHBOARD, { replace: true });
            notification.success({ message: 'Login success!' });
         },
      });
   };

   // Watch all values
   const [form] = useForm();
   const [submittable, setSubmittable] = useState(false);
   const values = Form.useWatch([], form);

   useEffect(() => {
      form.validateFields({ validateOnly: true }).then(
         () => {
            setSubmittable(true);
         },
         () => {
            setSubmittable(false);
         }
      );
   }, [values]);
   return (
      <>
         <Form<tLoginParams>
            layout={'vertical'}
            form={form}
            onFinish={formLoginSubmit}
            style={{ minWidth: 360, marginTop: '16px' }}>
            <Form.Item<string>
               label="User Name"
               name="username"
               rules={[{ required: true, message: 'Please input your username!' }]}>
               <Input placeholder="your-user-name" />
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
                  loading={mutationLogin.isLoading}
                  style={{ width: '100%', marginBottom: '0px', height: 40 }}
                  type="primary"
                  htmlType="submit"
                  disabled={!submittable}>
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
