import AuthLeftElement from '@components/AuthLeftElement';
import './style.less';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import ListOptionRegister from './ListOptionRegister';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const Register = () => {
   return (
      <>
         <Form className="register-form" layout={'vertical'}>
            <Form.Item
               label="User name"
               rules={[{ required: true, message: 'Please input User name' }]}>
               <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
               label="Password"
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
                     label="Name"
                     // rules={[{ required: true, message: 'Please input name' }]}>
                  >
                     <Input placeholder="Enter your name" />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item label="Phone">
                     <Input type="phone" placeholder="Enter your phone number" />
                  </Form.Item>
               </Col>
            </Row>
            <Form.Item style={{ display: 'none' }}>
               <Input placeholder="Enter your avatar" />
            </Form.Item>
            <Form.Item label="Address">
               <Input placeholder="Enter your address" />
            </Form.Item>

            <Form.Item style={{ display: 'none' }} label="Slug">
               <Input placeholder="Enter your slug" />
            </Form.Item>

            <Form.Item className="btn">
               <Button
                  style={{ width: '100%', marginBottom: '0px', height: 38 }}
                  type="primary"
                  htmlType="submit">
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

export default Register;
