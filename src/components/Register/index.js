import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { app } from '../../Firebase';
import './style.scss';
import { useHistory } from 'react-router-dom';


const Register = () => {
  const history = useHistory();

  const onFinish = async values => {
    const { userName, email, password } = values;
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      await app.auth().currentUser.updateProfile({ displayName: userName });
      history.push('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`${errorMessage} code:${errorCode}`);
    }

  };

  return (
    <div className="container">
      <div className="register">
        <Form
          name="register-form"
          className="register-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Please input your user name' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon"/>} placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email', type: 'email' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon"/>} placeholder='Email'
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password', len: 6 }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>} placeholder='Password'
            />
          </Form.Item>

          <Form.Item
            name="confirm-password"
            rules={[{ required: true, message: 'Please confirm your password', len: 6 }, ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            })]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>} placeholder='Confirm password'
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="register-btn" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>

  );
};

export default Register;
