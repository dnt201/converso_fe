import './style.less';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import ListOptionRegister from './ListOptionRegister';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { tRegister, useMutationRegister } from '@hooks/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
   const [form] = useForm<tRegister>();
   const mutationRegister = useMutationRegister();
   const navigate = useNavigate();
   const formRegisterSubmit = (formValue: tRegister) => {
      mutationRegister.mutate(formValue, {
         onSuccess: () => {
            navigate('/dashboard', { replace: true });
         },
      });
   };

   // Watch all values
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
         <Form
            onFinish={formRegisterSubmit}
            form={form}
            className="register-form"
            layout={'vertical'}
            autoComplete="off">
            <Form.Item
               name="username"
               label="User name"
               rules={[{ required: true, message: 'Please input User name' }]}>
               <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
               label="Password"
               name="password"
               rules={[{ required: true, message: 'Please input password' }]}>
               <Input.Password
                  className="input-password"
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
               />
            </Form.Item>
            <Row gutter={4}>
               <Col span={12}>
                  <Form.Item
                     label="Your Name"
                     name="name"
                     rules={[{ required: true, message: 'Please input your name' }]}>
                     <Input placeholder="Enter your name" />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item
                     label="Phone number"
                     name="phonenumber"
                     rules={[
                        {
                           required: true,
                           message: 'Phone number is required',
                        },
                        ({}) => ({
                           validator(_, value) {
                              if (!value || +value.toString().length === 10) {
                                 return Promise.resolve();
                              }
                              return Promise.reject(new Error('The phonenumber is 10 numbers!'));
                           },
                        }),
                     ]}>
                     <Input
                        maxLength={10}
                        // controls={false}
                        className="phone"
                        type="phone"
                        placeholder="Enter your phone number"
                     />
                  </Form.Item>
               </Col>
            </Row>
            <Form.Item style={{ display: 'none' }}>
               <Input placeholder="Enter your avatar" />
            </Form.Item>
            <Form.Item
               label="Address"
               name="address"
               rules={[{ required: true, message: 'Please input your address' }]}>
               <Input placeholder="Enter your address" />
            </Form.Item>

            <Form.Item style={{ display: 'none' }} label="Slug">
               <Input placeholder="Enter your slug" />
            </Form.Item>

            <Form.Item className="btn">
               <Button
                  style={{ width: '100%', marginBottom: '0px', height: 38 }}
                  type="primary"
                  htmlType="submit"
                  disabled={!submittable}>
                  Create Account
               </Button>
            </Form.Item>
            <Divider className="divider">or</Divider>
         </Form>
         <ListOptionRegister />
         <span className="notice">
            By creating an account you agree to <span className="emphasize">Terms</span> of Use and{' '}
            <span className="emphasize"> Privacy Policy</span>
         </span>
      </>
   );
};

export default RegisterForm;
